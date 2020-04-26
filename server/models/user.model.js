const mongoose = require("mongoose")
const { Schema } = mongoose

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    min: 3
  },
  email: {
    type: String,
    required: true,
    min: 3
  },
  password: {
    type: String,
    required: true,
    min: 8
  }
})

module.exports = mongoose.model("User", UserSchema)
