const bcrypt = require("bcryptjs")
const User = require("../models/user")
const ErrorHandler = require("../utils/errorHandler")
const AsyncErrorHandler = require("../middleware/catchAsyncError")

const userCtrl = {
  //user/register
  register: AsyncErrorHandler(async (req, res, next) => {
    let {name, profession, email, password} = req.body
    email = email.toLowerCase()

    if (!name || !email || !password || !profession)
      return next(new ErrorHandler("Please fill in all fields", 400))

    if (!validateEmail(email))
      return next(new ErrorHandler("Invalid emails", 400))

    const user = await User.findOne({email})
    if (user) return res.status(400).json({message: "Email already exists"})

    if (password.length < 6)
      return next(
        new ErrorHandler("Password must be at least 6 characters", 400)
      )
    //HASHED PASSWORD
    const passwordHash = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      name,
      email,
      profession,
      password: passwordHash,
    })
    // return new user
    res.status(201).json({
      message: "Registration Successfull",
      newUser,
    })
  }),

  //user/login
  login: AsyncErrorHandler(async (req, res, next) => {
    const {email, password} = req.body

    if (!email || !password)
      return next(new ErrorHandler("Please fill in all fields.", 406))

    const user = await User.findOne({email})

    if (!user) return next(new ErrorHandler("Email does not exist.", 400))
    //PASSWORD MATCH CHECK
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) return next(new ErrorHandler("Password is incorrect.", 400))

    res.status(200).json({
      message: "Login Successfull",
      data: {
        id: user._id,
        name: user.name,
        profession: user.profession,
        email: user.email,
      },
    })
  }),
  getAll: AsyncErrorHandler(async (req, res, next) => {
    const allUsers = await User.find()
    res.json({users: allUsers})
  }),
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

module.exports = userCtrl
