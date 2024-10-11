#include "ClientHandler.hpp"
#include <iostream>
#include <spdlog/spdlog.h>
#include <cstring>

ClientHandler::ClientHandler(socket_t client_socket, RestController& controller, ThreadPool& thread_pool)
    : client_socket_(client_socket), controller_(controller), thread_pool_(thread_pool) {}

void ClientHandler::handleClient()
{
    // Read the request in a separate task
    thread_pool_.enqueue([this]() {
        std::string request = readRequest();
        if (!request.empty()) {
            std::string response = controller_.processRequest(request);
            sendResponse(response);
        }
        close_socket(client_socket_);
    });
}

std::string ClientHandler::readRequest()
{
    char buffer[4096];
    std::memset(buffer, 0, sizeof(buffer));
    ssize_t bytes_read = recv(client_socket_, buffer, sizeof(buffer) - 1, 0);
    if (bytes_read < 0) {
        spdlog::error("Failed to read from client socket. Error: {}", GET_LAST_ERROR);
        return "";
    } else if (bytes_read == 0) {
        spdlog::info("Client disconnected.");
        return "";
    }
    spdlog::info("Request:\n{}", buffer);
    return std::string(buffer, bytes_read);
}

void ClientHandler::sendResponse(const std::string& response)
{
    ssize_t bytes_sent = send(client_socket_, response.c_str(), response.size(), 0);
    if (bytes_sent < 0) {
        spdlog::error("Failed to send response to client. Error: {}", GET_LAST_ERROR);
    }
}