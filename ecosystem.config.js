module.exports = {
  apps: [
    {
      name: "api.satisfactoria",
      script: "./server.js",
      watch: true,
      env: {
        PORT: 3000,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: "production",
        JWT_KEY: "would you look at this mortal hahahah, so puny and stupid",
        MONGO_URI: "mongodb://cd2:cd2@localhost:27017/cd2",
      },
    },
  ],
};
