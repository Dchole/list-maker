const mongoose = require("mongoose")
const { Schema } = mongoose

const RefreshSchema = new Schema({
  token: {
    type: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }
})

module.exports = mongoose.model("Refresh", RefreshSchema)
