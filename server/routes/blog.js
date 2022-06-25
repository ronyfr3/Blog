const express = require("express")
const router = express.Router()
const BlogCtrl = require("../controllers/blog")

router.get("/", BlogCtrl.getAll)
router.get("/:id", BlogCtrl.getOne)
router.post("/", BlogCtrl.create)
router.post("/review/:id", BlogCtrl.review)
router.post("/updateVote/:id", BlogCtrl.updateVote)
router.post("/downGradeVote/:id", BlogCtrl.downGradeVote)
router.delete("/delete/:id", BlogCtrl.delete)

module.exports = router
