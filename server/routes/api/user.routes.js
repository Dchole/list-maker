const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../../models/user.model");
const Refresh = require("../../models/refresh.model");
const authenticate = require("../middleware/auth");
const loginValidation = require("../validation/loginValidation");
const registerValidation = require("../validation/registerValidation");
const { createAccessToken, createRefreshToken } = require("../token/token");

router.get("/", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json({ user });
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body);
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
        path: error.details[0].path
      });

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      fullName: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      password: hashedPassword
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    jwt.sign(
      {
        userId: user._id
      },
      process.env.EMAIL_SECRET,
      { expiresIn: "3d" },
      (err, emailToken) => {
        if (err) console.log(err);

        const url = `${req.protocol}://${req.headers.host}/api/user/confirmation/${emailToken}`;

        const mailOptions = {
          from: `"List-Maker" <no-reply@list-maker.com>`,
          to: req.body.email,
          subject: "Confirm Email",
          html: `Please click on the link to confirm your email: <a href="${url}">${url}</a>`
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) console.log(err);
          else console.log(info);
        });
      }
    );

    await user.save();
    res.json({
      message:
        "A message has been sent to your email. Check and confirm your email to login"
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/confirmation/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const payload = jwt.verify(token, process.env.EMAIL_SECRET);

    await User.findByIdAndUpdate(payload.userId, { confirmed: true });

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);

    if (error)
      return res.status(400).json({
        message: error.details[0].message,
        path: error.details[0].path
      });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "User doesn't exists" });

    // if (!user.confirmed)
    //   return res
    //     .status(401)
    //     .json({ message: "Email hasn't been confirmed. Confirm before login!" })

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword)
      return res.status(400).json({ message: "User doesn't exists" });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    const refresh = new Refresh({ token: refreshToken, user: user._id });
    await refresh.save();

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/user/token"
      })
      .json({ accessToken, message: "Login successful" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/token", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET);
    const refresh = await Refresh.findOne({ token });

    if (!refresh || refresh.token !== token) return res.sendStatus(403);

    const accessToken = createAccessToken(payload.userId);
    const refreshToken = createRefreshToken(payload.userId);
    const newRefresh = new Refresh({
      token: refreshToken,
      user: payload.userId
    });

    await newRefresh.save();

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/user/token"
      })
      .json({ accessToken });
  } catch (err) {
    console.log(err);
  }
});

router.put("/", authenticate, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);
    await updatedUser.save();

    res.json({ message: "Update successful" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/logout", (_, res) => {
  try {
    res
      .clearCookie("refreshToken", {
        httpOnly: true,
        path: "/api/user/token"
      })
      .json({
        message: "Logged out successfully. Thank you for working with us"
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
