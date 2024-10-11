// include/Server.hpp
#ifndef SERVER_HPP
#define SERVER_HPP

#include <boost/asio.hpp>
#include <memory>
#include <vector>
#include "ClientSession.hpp"
#include "RequestHandler.hpp"

class Server {
public:
    Server(boost::asio::io_context& io_context, unsigned short port, std::size_t thread_pool_size);
    void run();
    void stop();

private:
    void doAccept();

    boost::asio::io_context& io_context_;
    boost::asio::ip::tcp::acceptor acceptor_;
    RequestHandler request_handler_;
    std::size_t thread_pool_size_;
    std::vector<std::thread> thread_pool_;
};

#endif // SERVER_HPP