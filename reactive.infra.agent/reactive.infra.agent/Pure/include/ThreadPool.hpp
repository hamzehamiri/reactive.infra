#ifndef THREADPOOL_HPP
#define THREADPOOL_HPP

#include <vector>
#include <thread>
#include <queue>
#include <functional>
#include <mutex>
#include <condition_variable>
#include <future>

class ThreadPool {
public:
    ThreadPool(size_t num_threads);
    ~ThreadPool();

    // Enqueue a task into the thread pool
    template<class F, class... Args>
    auto enqueue(F&& f, Args&&... args) 
        -> std::future<typename std::invoke_result<F, Args...>::type>;

private:
    // Worker threads
    std::vector<std::thread> workers;
    
    // Task queue
    std::queue<std::function<void()>> tasks;
    
    // Synchronization
    std::mutex queue_mutex;
    std::condition_variable condition;
    bool stop;
};

// Implementation of enqueue must be in the header
template<class F, class... Args>
auto ThreadPool::enqueue(F&& f, Args&&... args) 
    -> std::future<typename std::invoke_result<F, Args...>::type>
{
    using return_type = typename std::invoke_result<F, Args...>::type;

    // Package the task
    auto task = std::make_shared<std::packaged_task<return_type()>>(
        std::bind(std::forward<F>(f), std::forward<Args>(args)...)
    );
    
    std::future<return_type> res = task->get_future();
    
    { // Acquire lock
        std::unique_lock<std::mutex> lock(queue_mutex);
        
        // Don't allow enqueueing after stopping the pool
        if(stop)
            throw std::runtime_error("enqueue on stopped ThreadPool");
        
        tasks.emplace([task](){ (*task)(); });
    }
    
    condition.notify_one();
    return res;
}

#endif // THREADPOOL_HPP