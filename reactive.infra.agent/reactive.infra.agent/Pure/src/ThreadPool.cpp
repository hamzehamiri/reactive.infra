#include "ThreadPool.hpp"

ThreadPool::ThreadPool(size_t num_threads)
    : stop(false)
{
    for(size_t i = 0;i<num_threads;++i)
        workers.emplace_back(
            [this]
            {
                for(;;)
                {
                    std::function<void()> task;
    
                    { // Acquire lock
                        std::unique_lock<std::mutex> lock(this->queue_mutex);
                        this->condition.wait(lock, 
                            [this]{ return this->stop || !this->tasks.empty(); });
                        if(this->stop && this->tasks.empty())
                            return;
                        task = std::move(this->tasks.front());
                        this->tasks.pop();
                    }
    
                    // Execute the task
                    task();
                }
            }
        );
}

ThreadPool::~ThreadPool()
{
    { // Acquire lock
        std::unique_lock<std::mutex> lock(queue_mutex);
        stop = true;
    }
    condition.notify_all();
    for(std::thread &worker: workers)
        worker.join();
}