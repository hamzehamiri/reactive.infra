// src/RequestHandler.cpp
#include "RequestHandler.hpp"
#include <spdlog/spdlog.h>
#include <sstream>

RequestHandler::RequestHandler() {}

std::string RequestHandler::handleRequest(const std::string& request) {
    // Very basic HTTP request parsing
    std::istringstream request_stream(request);
    std::string method;
    std::string uri;
    std::string version;

    request_stream >> method >> uri >> version;

    nlohmann::json response_json;

    if (method == "GET") {
        response_json["message"] = "Hello, this is a GET response!";
    }
    else if (method == "POST") {
        response_json["message"] = "Hello, this is a POST response!";
    }
    else {
        response_json["message"] = "Unsupported request method.";
    }

    std::string body = response_json.dump();

    std::ostringstream response_stream;
    response_stream << "HTTP/1.1 200 OK\r\n";
    response_stream << "Content-Type: application/json\r\n";
    response_stream << "Content-Length: " << body.length() << "\r\n";
    response_stream << "Connection: close\r\n\r\n";
    response_stream << body;

    spdlog::info("Handled request: {} {} {}", method, uri, version);

    return response_stream.str();
}