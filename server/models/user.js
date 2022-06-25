const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: String,
    profession: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("apiUser", userSchema)
