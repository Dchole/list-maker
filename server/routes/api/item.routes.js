const router = require("express").Router()
const authenticate = require("../middleware/auth")
const Item = require("../../models/item.model")

router.get("/", authenticate, async (req, res) => {
  try {
    const lists = await Item.find({ admin: req.user.userId })
    res.json({ lists })
  } catch (err) {
    console.log(err)
  }
})

router.post("/", authenticate, async (req, res) => {
  try {
    const list = new Item({
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
    await Item.findByIdAndDelete(req.params.id)
    res.json({ message: "List deleted successfully" })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
