const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema(
  {
    user: {
      name: String,
      profession: String,
    },
    comment: String,
  },
  {
    timestamps: true,
  }
)

const blogsApiSchema = new mongoose.Schema(
  {
    user: {
      name: String,
      profession: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    upVote: {
      type: Number,
      default: 0,
    },
    downVote: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  {timestamps: true}
)

module.exports = mongoose.model("ourblogs", blogsApiSchema)
