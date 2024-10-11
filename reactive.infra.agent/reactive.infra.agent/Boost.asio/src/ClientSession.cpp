// src/ClientSession.cpp
#include "ClientSession.hpp"
#include <iostream>
#include <spdlog/spdlog.h>

ClientSession::ClientSession(boost::asio::ip::tcp::socket socket, RequestHandler& handler)
    : socket_(std::move(socket)), request_handler_(handler) {}

void ClientSession::start() {
    doRead();
}

void ClientSession::doRead() {
    auto self(shared_from_this());
    boost::asio::async_read_until(socket_, buffer_, "\r\n\r\n",
        [this, self](const boost::system::error_code& ec, std::size_t bytes_transferred) {
            onRead(ec, bytes_transferred);
        });
}

void ClientSession::onRead(const boost::system::error_code& ec, std::size_t bytes_transferred) {
    if (!ec) {
        std::istream request_stream(&buffer_);
        std::string request;
        std::getline(request_stream, request, '\0');

        spdlog::info("Received request:\n{}", request);

        std::string response = request_handler_.handleRequest(request);

        doWrite(response);
    }
    else {
        if (ec != boost::asio::error::operation_aborted) {
            spdlog::error("Read error: {}", ec.message());
        }
    }
}

void ClientSession::doWrite(const std::string& response) {
    auto self(shared_from_this());
    boost::asio::async_write(socket_, boost::asio::buffer(response),
        [this, self](const boost::system::error_code& ec, std::size_t /*bytes_transferred*/) {
            onWrite(ec, 0);
        });
}

void ClientSession::onWrite(const boost::system::error_code& ec, std::size_t /*bytes_transferred*/) {
    if (!ec) {
        boost::system::error_code ignored_ec;
        socket_.shutdown(boost::asio::ip::tcp::socket::shutdown_both, ignored_ec);
    }
    else {
        if (ec != boost::asio::error::operation_aborted) {
            spdlog::error("Write error: {}", ec.message());
        }
    }
}