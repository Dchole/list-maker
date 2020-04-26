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
    ],
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Item", ItemSchema)
