# Node Task Queue with Rate Limiting

## Project Overview

This project is a Node.js API that handles user tasks with rate limiting and a task queueing system. Each user can submit tasks, which are processed at a rate of 1 task per second and 20 tasks per minute. If the rate limit is exceeded, tasks are queued and processed later.

## Features

- Rate Limiting
- Task Queueing
- Logging
- Scalability

## Prerequisites

- Node.js 
- Redis
- PM2 

## Setup Instructions

2. Install Dependencies
>npm install

3. Start Redis
>redis-server

4. Start the Application with PM2
>pm2 start ecosystem.config.js

5. Make API Requests
You can make POST requests to the /task route to submit tasks. Use a tool like Postman or curl:

>curl -X POST http://localhost:3000/task -H "Content-Type: application/json" -d '{"user_id": "123"}'

6. Task Log
Task completion logs are stored in the task.log file located in the root directory of the project. Each log entry includes the user ID and the timestamp of task completion.
