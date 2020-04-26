const mongoose = require("mongoose")
const { Schema } = mongoose

const ItemSchema = new Schema(
  {
    fields: [
      {
        type: String,
        required: true,
        min: 3
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model("Item", ItemSchema)
