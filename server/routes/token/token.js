const { sign } = require("jsonwebtoken")

const createAccessToken = userId =>
  sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15m"
  })

const createRefreshToken = userId =>
  sign({ userId }, process.env.REFRESH_SECRET, {
    expiresIn: "7d"
  })

module.exports = { createAccessToken, createRefreshToken }
