#include "RestController.hpp"
#include <sstream>
#include <spdlog/spdlog.h>

RestController::RestController() {}

std::string RestController::processRequest(const std::string& request) {
    // Simple HTTP request parsing
    std::istringstream request_stream(request);
    std::string method;
    std::string uri;
    std::string http_version;
    
    request_stream >> method >> uri >> http_version;
    
    spdlog::info("Received request: Method={}, URI={}", method, uri);
    
    std::string response_body;
    
    if (method == "GET") {
        response_body = "Hello, this is a GET response!";
    } else if (method == "POST") {
        response_body = "Hello, this is a POST response!";
    } else {
        response_body = "Unsupported request method.";
    }
    
    nlohmann::json json_response = createJsonResponse(response_body);
    
    // Create HTTP response
    std::string response = "HTTP/1.1 200 OK\r\n";
    response += "Content-Type: application/json\r\n";
    response += "Content-Length: " + std::to_string(json_response.dump().size()) + "\r\n";
    response += "Connection: close\r\n\r\n";
    response += json_response.dump();
    
    return response;
}

nlohmann::json RestController::createJsonResponse(const std::string& message) {
    nlohmann::json json;
    json["message"] = message;
    return json;
}