const Blog = require("../models/blog")
const ErrorHandler = require("../utils/errorHandler")
const AsyncErrorHandler = require("../middleware/catchAsyncError")

const BlogCtrl = {
  create: AsyncErrorHandler(async (req, res, next) => {
    const newBlog = new Blog(req.body)

    const savedBlog = await newBlog.save()
    res.status(200).json({savedBlog, message: "Blog created successfully"})
  }),
  getAll: AsyncErrorHandler(async (req, res, next) => {
    const blog = await Blog.find().sort({updatedAt: 1})
    if (blog.length === 0) {
      return next(new ErrorHandler("Empty Items list"))
    } else {
      res.status(200).json({blog})
    }
  }),
  getOne: AsyncErrorHandler(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
    res.status(200).json(blog)
  }),
  review: AsyncErrorHandler(async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(new ErrorHandler("Please fill at least one field"))
    } else {
      const {user, comment} = req.body
      const blog = await Blog.findById(req.params.id)
      if (blog) {
        const review = {
          user,
          comment,
        }
        blog.reviews.push(review)
        await blog.save()
        res.status(201).json({message: "Review added"})
      } else {
        return next(new ErrorHandler("Blog not found"))
      }
    }
  }),
  updateVote: AsyncErrorHandler(async (req, res, next) => {
    await Blog.findOneAndUpdate(
      {_id: req.params.id},
      {
        $inc: {upVote: 1},
      }
    )
    res.status(200).json({message: "You added upVote"})
  }),
  downGradeVote: AsyncErrorHandler(async (req, res, next) => {
    await Blog.findOneAndUpdate(
      {_id: req.params.id},
      {
        $inc: {downVote: 1},
      }
    )
    res.status(200).json({message: "You added downVote"})
  }),
  delete: AsyncErrorHandler(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      await blog.remove()
      res
        .status(200)
        .json({success: true, message: "Blog deleted successfully"})
    } else {
      return next(new ErrorHandler("Blog not found", 404))
    }
  }),
}
module.exports = BlogCtrl
