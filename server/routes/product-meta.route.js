const express = require('express');
const router = express.Router();
const { ProductMeta } = require('../models/product-meta.model');
const { verifyToken, hasRole, hasRoles } = require('./plugins/auth.middleware');

// Create
router.post('/', /*verifyToken, hasRoles(['admin', 'logistics'], false),*/ (req, res) => {
    ProductMeta.create(req.body, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.status(201).send(doc);
    });
});

// Update
router.put('/:id', /*verifyToken, hasRole('admin'),*/ (req, res) => {
    ProductMeta.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send(doc);
    });
});

// Delete
router.delete('/:id', /*verifyToken, hasRole('admin'),*/ (req, res) => {
    ProductMeta.findOneAndDelete(req.params.id, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send({deleted: doc._id});
    });
});

// Read
router.get('/select', /*verifyToken, hasRole('admin'),*/ (req, res) => {
    ProductMeta.find({}, '_id name', (err, products) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send(products);
    });
});

router.get("/categories", async (req, res) => {
    try {
      const categories = await ProductMeta.distinct("type", {});
      res.status(200).json({
        categories,
      });
    } catch (err) {
      res.status(500).send("Internal server error");
    }
});

router.get('/:id', /*verifyToken, hasRole('admin'),*/ (req, res) => {
    ProductMeta.findById(req.params.id, (err, doc) => {
        if (err) {
            console.error(err);
            return res.status(400).send(err);
        }
        res.send(doc);
    });
});


module.exports = router;