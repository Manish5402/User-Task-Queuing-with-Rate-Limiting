// server.js
import express, { json } from 'express';
import Bull from 'bull';
import rateLimiter from './rateLimiter';
import task from './task';

const app = express();
const PORT = process.env.PORT || 3000;

const taskQueue = new Bull('task-queue', { redis: { host: 'localhost', port: 6379 } });

app.use(json());

app.post('/task', rateLimiter, async (req, res) => {
    const { user_id } = req.body;
    await taskQueue.add({ user_id });
    res.status(202).json({ message: 'Task queued.' });
});

taskQueue.process(async (job) => {
    await task(job.data.user_id);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});// ecosystem.config.js
export const apps = [{
    name: 'node-task-queue',
    script: './server.js',
    instances: 2,
    exec_mode: 'cluster',
    watch: true,
}];

