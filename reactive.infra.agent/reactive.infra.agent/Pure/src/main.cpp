#include "HttpServer.hpp"
#include <csignal>
#include <iostream>
#include <memory>
#include <spdlog/spdlog.h>

// Global pointer for signal handling
std::shared_ptr<HttpServer> server_ptr = nullptr;

void signalHandler(int signum)
{
    spdlog::info("Interrupt signal ({}) received. Shutting down.", signum);
    if (server_ptr) {
        server_ptr->stop();
    }
    exit(signum);
}

int main()
{
    // Initialize spdlog
    spdlog::set_level(spdlog::level::info); // Set global log level to info
    spdlog::info("Starting MyHttpServer...");

    // Register signal handler for graceful shutdown
    std::signal(SIGINT, signalHandler);
    std::signal(SIGTERM, signalHandler);

    try {
        // Initialize server on port 8080 with a thread pool of 4 threads
        server_ptr = std::make_shared<HttpServer>(8080, 4);

        if (!server_ptr->start()) {
            spdlog::error("Failed to start server.");
            return 1;
        }

        // Keep the main thread alive
        while (true) {
            std::this_thread::sleep_for(std::chrono::seconds(1));
        }
    }
    catch (const std::exception& ex) {
        spdlog::error("Exception: {}", ex.what());
        return 1;
    }

    return 0;
}