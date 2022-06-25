process.on("uncaughtException", (err) => {
  console.log(
    `server is shutting down due to uncaught exception: ${err.message} ${err.stack}`
  )
})

require("dotenv").config()
const express = require("express")
const cors = require("cors")

//app initialization
const app = express()
//require db
const connect = require("./config/db")
connect()

//body-parser
app.use(express.json())

//cors
app.use(cors())

let PORT = process.env.PORT || 8080

app.get("/", (req, res) => {
  res.status(200).send(`App is running the server at port: ${PORT}`)
})

// Routes
app.use("/api/v1/blog", require("./routes/blog"))
app.use("/api/v1/user", require("./routes/user"))

const server = app.listen(PORT, () =>
  console.log(`server is running at port ${PORT}`)
)

process.on("unhandledRejection", (err) => {
  console.log(
    "shutting down server due to unhandled promise rejection. Error: " +
      err.message
  )
  server.close(() => {
    process.exit(1)
  })
})
