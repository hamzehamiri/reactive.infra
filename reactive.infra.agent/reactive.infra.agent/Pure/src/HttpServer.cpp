#include "HttpServer.hpp"
#include "ClientHandler.hpp"
#include "Platform.hpp"
#include <cstring>
#include <spdlog/spdlog.h>
#include <thread>
#include <chrono>

// Constructor
HttpServer::HttpServer(int port, size_t thread_pool_size)
    : port_(port), is_running_(false), thread_pool_(thread_pool_size)
{
#ifdef _WIN32
    WSADATA wsaData;
    int wsaResult = WSAStartup(MAKEWORD(2, 2), &wsaData);
    if (wsaResult != 0) {
        spdlog::error("WSAStartup failed: {}", wsaResult);
        throw std::runtime_error("WSAStartup failed");
    }
#endif
}

// Destructor
HttpServer::~HttpServer()
{
    stop();

#ifdef _WIN32
    WSACleanup();
#endif
}

bool HttpServer::start()
{
    server_socket_ = socket(AF_INET, SOCK_STREAM, 0);
    if (server_socket_ == INVALID_SOCKET) {
        spdlog::error("Failed to create socket. Error: {}", GET_LAST_ERROR);
        return false;
    }

    // Set socket options
    int opt = 1;
    if (setsockopt(server_socket_, SOL_SOCKET, SO_REUSEADDR, (char*)&opt, sizeof(opt)) < 0) {
        spdlog::error("setsockopt failed. Error: {}", GET_LAST_ERROR);
        return false;
    }

    // Set socket to non-blocking
#ifdef _WIN32
    u_long mode = 1;
    if (ioctlsocket(server_socket_, FIONBIO, &mode) != NO_ERROR) {
        spdlog::error("ioctlsocket failed. Error: {}", GET_LAST_ERROR);
        return false;
    }
#else
    int flags = fcntl(server_socket_, F_GETFL, 0);
    if (flags == -1) flags = 0;
    if (fcntl(server_socket_, F_SETFL, flags | O_NONBLOCK) == -1) {
        spdlog::error("fcntl failed. Error: {}", GET_LAST_ERROR);
        return false;
    }
#endif

    // Bind
    struct sockaddr_in address;
    std::memset(&address, 0, sizeof(address));
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(port_);

    if (bind(server_socket_, (struct sockaddr*)&address, sizeof(address)) < 0) {
        spdlog::error("Bind failed. Error: {}", GET_LAST_ERROR);
        return false;
    }

    // Listen
    if (listen(server_socket_, SOMAXCONN) < 0) {
        spdlog::error("Listen failed. Error: {}", GET_LAST_ERROR);
        return false;
    }

    is_running_ = true;
    accept_thread_ = std::thread(&HttpServer::acceptClients, this);
    spdlog::info("Server started on port {}", port_);
    return true;
}

void HttpServer::stop()
{
    if (is_running_) {
        is_running_ = false;
        close_socket(server_socket_);
        if (accept_thread_.joinable()) {
            accept_thread_.join();
        }
        spdlog::info("Server stopped.");
    }
}

void HttpServer::acceptClients()
{
    while (is_running_) {
        struct sockaddr_in client_addr;
        socklen_t client_len = sizeof(client_addr);
        socket_t client_socket = accept(server_socket_, (struct sockaddr*)&client_addr, &client_len);
        if (client_socket == INVALID_SOCKET) {
#ifdef _WIN32
            int error = GET_LAST_ERROR;
            if (error == WSAEWOULDBLOCK) {
                // No pending connections; sleep briefly
                std::this_thread::sleep_for(std::chrono::milliseconds(100));
                continue;
            } else {
                spdlog::error("Accept failed. Error: {}", error);
                break;
            }
#else
            if (errno == EWOULDBLOCK || errno == EAGAIN) {
                // No pending connections; sleep briefly
                std::this_thread::sleep_for(std::chrono::milliseconds(100));
                continue;
            } else {
                spdlog::error("Accept failed. Error: {}", errno);
                break;
            }
#endif
        }

        // Set client socket to non-blocking (already done if server is non-blocking)

        // Create a new ClientHandler and manage it
        auto client_handler = std::make_shared<ClientHandler>(client_socket, rest_controller_, thread_pool_);
        {
            std::lock_guard<std::mutex> lock(clients_mutex_);
            clients_.emplace_back(client_handler);
        }
        client_handler->handleClient();

        spdlog::info("Accepted new client from {}:{}",
            inet_ntoa(client_addr.sin_addr), ntohs(client_addr.sin_port));
    }
}