require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const mongoose = require("mongoose")
const http = require("http")
const socketio = require("socket.io")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")

const PORT = process.env.PORT
const user = require("./routes/api/user.routes")
const list = require("./routes/api/list.routes")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const Refresh = require("./models/refresh.model")

app.use(helmet())
app.use(express.json())
app.use(express.static(path.join(__dirname, "build")))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
)

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err))

app.use("/api/user", user)
app.use("/api/list", list)
;(async function () {
  try {
    const tokens = await Refresh.find()

    for (const token of tokens) {
      const daysInterval =
        new Date().getDate() - new Date(token.createdAt).getDate()
      if (Math.abs(daysInterval) >= 7) token.remove()
    }
  } catch (err) {
    console.log(err)
  }
})()

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
)

io.on("connection", socket => {
  socket.on("addToList", list => {
    io.emit("addedToList", list)
  })

  socket.on("setStatus", () => {
    io.emit("statusChanged")
  })

  socket.on("disconnect", () => {
    console.log("Disconnected")
  })
})

server.listen(PORT, () => console.info(`Server running on port: ${PORT}`))
