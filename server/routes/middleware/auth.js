const { verify } = require("jsonwebtoken")

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(" ")[1]

    verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)

      req.user = user
      next()
    })
  } else res.sendStatus(401)
}

module.exports = authenticate
