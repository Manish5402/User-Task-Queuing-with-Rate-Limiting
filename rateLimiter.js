// rateLimiter.js
import { createClient } from 'redis';
const client = createClient();

async function rateLimiter(req, res, next) {
    const { user_id } = req.body;
    const currentTime = Math.floor(Date.now() / 1000);
    const minuteKey = `minute-${user_id}-${Math.floor(currentTime / 60)}`;
    const secondKey = `second-${user_id}-${currentTime}`;

    const [secondCount, minuteCount] = await Promise.all([
        client.get(secondKey) || 0,
        client.get(minuteKey) || 0,
    ]);

    if (secondCount >= 1 || minuteCount >= 20) {
        return res.status(429).json({ message: "Rate limit exceeded, task queued." });
    }

    await Promise.all([
        client.incr(secondKey),
        client.incr(minuteKey),
        client.expire(secondKey, 1),
        client.expire(minuteKey, 60),
    ]);

    next();
}

export default rateLimiter;
