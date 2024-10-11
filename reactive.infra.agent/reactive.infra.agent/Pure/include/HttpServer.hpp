#ifndef HTTPSERVER_HPP
#define HTTPSERVER_HPP

#include <vector>
#include <thread>
#include <mutex>
#include "ClientHandler.hpp"
#include "RestController.hpp"
#include "ThreadPool.hpp"

class HttpServer {
public:
    HttpServer(int port, size_t thread_pool_size);
    ~HttpServer();
    
    bool start();
    void stop();

private:
    void acceptClients();

    int server_socket_;
    int port_;
    bool is_running_;
    std::thread accept_thread_;
    RestController rest_controller_;
    ThreadPool thread_pool_;
    std::mutex clients_mutex_;
    std::vector<std::shared_ptr<ClientHandler>> clients_;
};

#endif // HTTPSERVER_HPP