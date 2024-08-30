module.exports = {
    apps: [{
      name: 'node-task-queue',
      script: './server.js',
      instances: 2,
      exec_mode: 'cluster',
      watch: true,
    }]
  };
  