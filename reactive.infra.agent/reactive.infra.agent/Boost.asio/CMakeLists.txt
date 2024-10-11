# CMakeLists.txt
cmake_minimum_required(VERSION 3.10)
project(MyHttpServer VERSION 1.0.0 LANGUAGES CXX)

# Specify C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Find packages installed by vcpkg
find_package(Boost REQUIRED COMPONENTS system thread)
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
    Boost::system
    Boost::thread
    nlohmann_json::nlohmann_json
    spdlog::spdlog
)

# Optional: Define macros if needed
# target_compile_definitions(${PROJECT_NAME} PRIVATE ...)

# Installation (optional)
install(TARGETS ${PROJECT_NAME} DESTINATION bin)