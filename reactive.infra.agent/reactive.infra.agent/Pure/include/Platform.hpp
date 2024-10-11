#ifndef PLATFORM_HPP
#define PLATFORM_HPP

#ifdef _WIN32
    #define _WIN32_WINNT 0x0601  // Windows 7 or later
    #include <winsock2.h>
    #include <ws2tcpip.h>
    #pragma comment(lib, "Ws2_32.lib")  // Link with Ws2_32.lib

    typedef SOCKET socket_t;
    #define close_socket closesocket
    #define GET_LAST_ERROR WSAGetLastError()
#else
    #include <sys/types.h>
    #include <sys/socket.h>
    #include <netinet/in.h>
    #include <arpa/inet.h>
    #include <unistd.h>
    #include <fcntl.h>
    #include <netdb.h>
    #include <errno.h>

    typedef int socket_t;
    #define INVALID_SOCKET (-1)
    #define SOCKET_ERROR (-1)
    #define close_socket close
    #define GET_LAST_ERROR errno
#endif

#endif // PLATFORM_HPP