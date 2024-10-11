#ifndef CLIENTHANDLER_HPP
#define CLIENTHANDLER_HPP

#include <string>
#include <memory>
#include "RestController.hpp"
#include "ThreadPool.hpp"
#include "Platform.hpp"

class ClientHandler {
public:
    ClientHandler(socket_t client_socket, RestController& controller, ThreadPool& thread_pool);
    void handleClient();

private:
    socket_t client_socket_;
    RestController& controller_;
    ThreadPool& thread_pool_;
    
    std::string readRequest();
    void sendResponse(const std::string& response);
};

#endif // CLIENTHANDLER_HPP