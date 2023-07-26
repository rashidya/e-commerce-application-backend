const express = require("express");
const Supplier = require("../schema/supplier.schema");
const router = express.Router();

router.get("/", async (req, res) => {
  Supplier.find()
    .then((suppliers) => {
      res.json(suppliers);
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

router.post("/", async (req, res) => {
  const newSupplier = new Supplier({
    name: req.body.name,
    contact: req.body.contact,
    address: req.body.address,
  });

  newSupplier
    .save()
    .then((supplier) => {
      res.send(supplier);
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  Supplier.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedSupplier) => {
      res.json(updatedSupplier);
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Supplier.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.send("Supplier deleted successfully");
      } else {
        res.send("Supplier not found or already deleted");
      }
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

module.exports = router;
