# CMakeList.txt : CMake project for reactive.infra.agent, include source and define
# project specific logic here.
#
cmake_minimum_required (VERSION 3.8)

# Add source to this project's executable.
add_executable (reactive.infra.agent "reactive.infra.agent.cpp" "reactive.infra.agent.h")

if (CMAKE_VERSION VERSION_GREATER 3.12)
  set_property(TARGET reactive.infra.agent PROPERTY CXX_STANDARD 20)
endif()

# TODO: Add tests and install targets if needed.
