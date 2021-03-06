const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    fields: [
      {
        type: String,
        required: true,
        min: 3
      }
    ],
    active: {
      type: Schema.Types.Boolean,
      default: true
    },
    members: [
      {
        info: [{ type: Schema.Types.String, required: true }],
        time: { type: Date, default: Date.now }
      }
    ],
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
