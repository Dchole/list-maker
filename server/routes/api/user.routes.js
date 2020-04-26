const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../../models/user.model")
const Refresh = require("../../models/refresh.model")
const authenticate = require("../middleware/auth")
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
    const userExists = await User.findOne({ email: req.body.email })
    console.log(userExists)
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
    refresh.save()

    res
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .json({ accessToken })
  } catch (err) {
    console.log(err)
  }
})

router.get("/token", async (req, res) => {
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

    newRefresh.save()

    res
      .cookie("refreshToken", refreshToken, { httpOnly: true })
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
