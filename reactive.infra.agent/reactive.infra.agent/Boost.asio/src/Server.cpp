// src/Server.cpp
#include "Server.hpp"
#include <spdlog/spdlog.h>

Server::Server(boost::asio::io_context& io_context, unsigned short port, std::size_t thread_pool_size)
    : io_context_(io_context),
      acceptor_(io_context_, boost::asio::ip::tcp::endpoint(boost::asio::ip::tcp::v4(), port)),
      request_handler_(),
      thread_pool_size_(thread_pool_size)
{
    spdlog::info("Server initialized on port {}", port);
}

void Server::run() {
    doAccept();

    // Create a pool of threads to run all of the io_contexts.
    for (std::size_t i = 0; i < thread_pool_size_; ++i) {
        thread_pool_.emplace_back([this]() {
            io_context_.run();
        });
    }

    spdlog::info("Server running with {} threads", thread_pool_size_);

    // Wait for all threads in the pool to exit.
    for (auto& t : thread_pool_) {
        if (t.joinable()) {
            t.join();
        }
    }
}

void Server::doAccept() {
    acceptor_.async_accept(
        [this](const boost::system::error_code& ec, boost::asio::ip::tcp::socket socket) {
            if (!ec) {
                spdlog::info("Accepted new connection from {}", socket.remote_endpoint().address().to_string());
                std::make_shared<ClientSession>(std::move(socket), request_handler_)->start();
            }
            else {
                spdlog::error("Accept error: {}", ec.message());
            }

            doAccept();
        }
    );
}

void Server::stop() {
    spdlog::info("Stopping server...");
    io_context_.stop();
}