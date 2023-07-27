const express = require("express");
const Item = require("../models/item.schema");

const router = express.Router();

router.get("/",async (req, res) => {
    Item.find()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.send("Error : " + err);
    });
});

// POST create a new user
router.post('/', async (req, res) => {
  const newItem = new Item(req.body);

  newItem.save()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      res.send('Error: ' + err);
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
    Item.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedItem) => {
      res.json(updatedItem);
    })
    .catch((err) => {
      res.send("Error : " + err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Item.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.send("Item deleted successfully");
      } else {
        res.send("Item not found or already deleted");
      }
    })
    .catch((err) => {
      res.send("Error:" + err);
    });
});

module.exports = router;
