const router = require("express").Router()
const userCtrl = require("../controllers/user")

router.get("/", userCtrl.getAll)
router.post("/register", userCtrl.register)
router.post("/login", userCtrl.login)

module.exports = router
