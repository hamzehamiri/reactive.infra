// include/ClientSession.hpp
#ifndef CLIENT_SESSION_HPP
#define CLIENT_SESSION_HPP

#include <boost/asio.hpp>
#include <memory>
#include <array>
#include "RequestHandler.hpp"

class ClientSession : public std::enable_shared_from_this<ClientSession> {
public:
    ClientSession(boost::asio::ip::tcp::socket socket, RequestHandler& handler);
    void start();

private:
    void doRead();
    void onRead(const boost::system::error_code& ec, std::size_t bytes_transferred);
    void doWrite(const std::string& response);
    void onWrite(const boost::system::error_code& ec, std::size_t bytes_transferred);

    boost::asio::ip::tcp::socket socket_;
    RequestHandler& request_handler_;
    boost::asio::streambuf buffer_;
};

#endif // CLIENT_SESSION_HPP