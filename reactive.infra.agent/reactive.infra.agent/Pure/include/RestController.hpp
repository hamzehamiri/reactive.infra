#ifndef RESTCONTROLLER_HPP
#define RESTCONTROLLER_HPP

#include <string>
#include <nlohmann/json.hpp>

class RestController {
public:
    RestController();
    std::string processRequest(const std::string& request);
private:
    nlohmann::json createJsonResponse(const std::string& message);
};

#endif // RESTCONTROLLER_HPP