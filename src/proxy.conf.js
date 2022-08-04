const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "https://localhost:40443",
    secure: true
  }
]

module.exports = PROXY_CONFIG;
