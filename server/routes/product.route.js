const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const { verifyToken, hasRole } = require('./middleware/auth.middleware');

// Create
router.post('/', verifyToken, hasRole('admin'), (req, res) => {
    Product.create(req.body, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.status(201).send(doc);
    });
});

// Read
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send(doc);
    });
});

// Update
router.put('/:id', verifyToken, hasRole('admin'), (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send(doc);
    });
});

// Delete
router.delete('/:id', verifyToken, hasRole('admin'), (req, res) => {
    Product.findOneAndDelete(req.params.id, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send({deleted: doc._id});
    });
});

module.exports = router;