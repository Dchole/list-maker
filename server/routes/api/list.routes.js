const router = require("express").Router()
const authenticate = require("../middleware/auth")
const List = require("../../models/list.model")

router.get("/", authenticate, async (req, res) => {
  try {
    const lists = await List.find({ admin: req.user.userId })
    res.json({ lists })
  } catch (err) {
    console.log(err)
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const list = new List({
      title: req.body.title,
      fields: req.body.fields,
      admin: req.user.userId
    })
    await list.save()
    res.json({ message: "List created successfully" })
  } catch (err) {
    console.log(err)
  }
})

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id)
    res.json({ message: "List deleted successfully" })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
