const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../../models/user.model")
const Refresh = require("../../models/refresh.model")
const authenticate = require("../middleware/auth")
const loginValidation = require("../validation/loginValidation")
const registerValidation = require("../validation/registerValidation")
const { createAccessToken, createRefreshToken } = require("../token/token")

router.get("/", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password")

    res.json({ user })
  } catch (err) {
    console.log(err)
  }
})

router.post("/register", async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body)
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
        path: error.details[0].path
      })

    const userExists = await User.findOne({ email: req.body.email })
    if (userExists)
      return res.status(400).json({ message: "User already exists" })
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
      fullName: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      password: hashedPassword
    })

    await user.save()
    res.json({ message: "Signup successful" })
  } catch (err) {
    console.log(err)
  }
})

router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body)
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
        path: error.details[0].path
      })

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ message: "User doesn't exists" })

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!correctPassword)
      return res.status(400).json({ message: "User doesn't exists" })

    const accessToken = createAccessToken(user._id)
    const refreshToken = createRefreshToken(user._id)

    const refresh = new Refresh({ token: refreshToken, user: user._id })
    await refresh.save()

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/user/token"
      })
      .json({ accessToken, message: "Login successful" })
  } catch (err) {
    console.log(err)
  }
})

router.post("/token", async (req, res) => {
  const token = req.cookies.refreshToken
  if (!token) return res.sendStatus(401)

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET)
    const refresh = await Refresh.findOne({ token })

    if (!refresh || refresh.token !== token) return res.sendStatus(403)

    const accessToken = createAccessToken(payload.userId)
    const refreshToken = createRefreshToken(payload.userId)
    const newRefresh = new Refresh({
      token: refreshToken,
      user: payload.userId
    })

    await newRefresh.save()

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/user/token"
      })
      .json({ accessToken })
  } catch (err) {
    console.log(err)
  }
})

router.put("/", authenticate, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body)
    await updatedUser.save()

    res.json({ message: "Update successful" })
  } catch (err) {
    console.log(err)
  }
})

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("refreshtoken")
    res.json({ message: "Logged out successfully" })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
