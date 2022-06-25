const mongoose = require("mongoose")

const connectDB = async () => {
  mongoose
    .connect(
      "mongodb+srv://david100:david100@cluster0.x0vvr.mongodb.net/david100?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((data) => {
      console.log(
        `mongodb connection established with server: ${data.connection.host}`
      )
    })
}

module.exports = connectDB
