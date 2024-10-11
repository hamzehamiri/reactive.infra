cmake_minimum_required(VERSION 3.10)
project(MyHttpServer VERSION 1.0.0 LANGUAGES CXX)

# Specify C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Find required packages
find_package(nlohmann_json REQUIRED)
find_package(spdlog REQUIRED)

# Include directories
include_directories(${CMAKE_SOURCE_DIR}/include)

# Source files
file(GLOB_RECURSE SOURCES "src/*.cpp")

# Add executable
add_executable(${PROJECT_NAME} ${SOURCES})

# Link libraries
target_link_libraries(${PROJECT_NAME} PRIVATE
    nlohmann_json::nlohmann_json
    spdlog::spdlog
)

# Link against Winsock on Windows
if(WIN32)
    target_link_libraries(${PROJECT_NAME} PRIVATE Ws2_32)
endif()

# For UNIX systems, link with pthread
if(UNIX)
    find_package(Threads REQUIRED)
    target_link_libraries(${PROJECT_NAME} PRIVATE Threads::Threads)
endif()

# Installation (optional)
install(TARGETS ${PROJECT_NAME} DESTINATION bin)