const express = require("express");
const router = express.Router();
const { Product, search } = require("../models/product.model");
const { verifyToken, hasRole } = require("./plugins/auth.middleware");
const { send } = require("process");

// Update
router.put("/pull-stock", verifyToken, hasRole("logistics"), (req, res) => {
  Product.updateMany(
    {
      _id: { $in: req.body.ids },
      quantity: { $gt: 0 },
    },
    { $inc: { quantity: -1 } },
    { multi: true },
    (err, status) => {
      if (err) return req.status(400).send(err);

      if (status.matchedCount < req.body.ids) {
        req.status(409).send("Some products were unavailable");
      }
      req.send("Success");
    }
  );
});

router.put("/:id/add-stock", verifyToken, hasRole("logistics"), (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    { $inc: { quantity: req.body.count } },
    (err, doc) => {
      if (err) return res.status(400).send(err);

      res.send({ _id: doc._id, quantity: doc.quantity });
    }
  );
});

router.put("/:id", verifyToken, hasRole("admin"), (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.send(doc);
  });
});

// Delete
router.delete("/:id", verifyToken, hasRole("admin"), (req, res) => {
  Product.findOneAndDelete(req.params.id, (err, doc) => {
    if (err) return res.status(400).send(err);

    res.send({ deleted: doc._id });
  });
});

// Create
router.post('/', verifyToken, hasRole('admin'), (req, res) => {
  Product.create(req.body, (err, doc) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(201).send(doc);
  });
});

// Read
router.get('/count', verifyToken, hasRole('admin'), (req, res) => {
    Product.countDocuments({showInStore: true}, (err, count) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send({data: count});
    });

});

router.get("/select", verifyToken, hasRole("admin"), (req, res) => {
  Product.find({}, "_id name", (err, products) => {
    if (err) {
      console.error(err);
      return res.status(400).send(err);
    }
    res.send(products);
  });
});

router.get("/searchProducts", async (req, res) => {
    try {
        const result = await search();
        res.send(result);   
      }  catch (err) {
        console.error(err);
        return res.status(400).send(err);
      }
});

router.post("/searchProducts", async (req, res) => {
  try {
    const result = await search(req.body.ids);
    res.send(result);   
  }  catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
});

router.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, doc) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.send(doc);
  });
});

module.exports = router;
