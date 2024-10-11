// include/RequestHandler.hpp
#ifndef REQUEST_HANDLER_HPP
#define REQUEST_HANDLER_HPP

#include <string>
#include <nlohmann/json.hpp>
#include <boost/asio.hpp>

class RequestHandler {
public:
    RequestHandler();
    std::string handleRequest(const std::string& request);
};

#endif // REQUEST_HANDLER_HPP