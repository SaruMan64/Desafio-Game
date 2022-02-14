module.exports = {
  apps: [
    {
      name: "Backend",
      script: "npm",
      args: "start",
      cwd: "./backend/",
      watch: true,
      watch_delay: 1000,
      "ignore_watch": ["node_modules"]
    },
    {
      name: "Frontend",
      script: "npm",
      args: "start",
      cwd: "./frontend/",
      watch: true,
      watch_delay: 1000,
      "ignore_watch": ["node_modules"]    
    },
  ],
};
