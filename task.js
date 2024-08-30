// task.js
import { appendFile } from 'fs';
import { join } from 'path';

async function task(user_id) {
    const logMessage = `${user_id} - task completed at - ${new Date().toISOString()}\n`;
    const logFilePath = join(__dirname, 'task.log');

    // Append the log message to the log file
    appendFile(logFilePath, logMessage, (err) => {
        if (err) throw err;
        console.log(logMessage.trim());
    });
}

export default task;
