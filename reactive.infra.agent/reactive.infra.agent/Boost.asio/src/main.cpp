// src/main.cpp
#include "Server.hpp"
#include <boost/asio.hpp>
#include <csignal>
#include <iostream>
#include <memory>
#include <spdlog/spdlog.h>

std::shared_ptr<Server> server_ptr;
std::shared_ptr<boost::asio::io_context> io_context_ptr;

void signalHandler(int signum) {
    spdlog::info("Interrupt signal ({}) received. Shutting down...", signum);
    if (server_ptr) {
        server_ptr->stop();
    }
    if (io_context_ptr) {
        io_context_ptr->stop();
    }
    exit(signum);
}

int main(int argc, char* argv[]) {
    // Initialize spdlog with a basic console logger
    spdlog::set_level(spdlog::level::info); // Set global log level to info
    spdlog::info("Starting MyHttpServer...");

    // Register signal handler for graceful shutdown
    std::signal(SIGINT, signalHandler);
    std::signal(SIGTERM, signalHandler);

    try {
        io_context_ptr = std::make_shared<boost::asio::io_context>();

        unsigned short port = 8080;
        std::size_t thread_pool_size = std::thread::hardware_concurrency();

        if (thread_pool_size == 0)
            thread_pool_size = 4; // default to 4 threads if hardware_concurrency cannot determine

        server_ptr = std::make_shared<Server>(*io_context_ptr, port, thread_pool_size);
        server_ptr->run();
    }
    catch (const std::exception& ex) {
        spdlog::error("Exception: {}", ex.what());
    }

    return 0;
}