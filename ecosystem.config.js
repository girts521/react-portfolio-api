module.exports = {
  apps : [{
    name: "gkarcevskis-portfolio-api",
    script: "./index.ts",
    instances: "2",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
