module.exports = {
  apps: [
    {
      name: "Backend",
      script: "server.js",
      /* args: "start", */
      cwd: "./backend/",
      watch: true,
      /* watch_delay: 1000,
      "ignore_watch": ["node_modules"] */
    },
    {
      name: "Frontend",
      script: "app.js",
      /* args: "start", */
      cwd: "./frontend/",
      watch: true,
      /* watch_delay: 1000,
      "ignore_watch": ["node_modules"]  */
    }
  ]
};
