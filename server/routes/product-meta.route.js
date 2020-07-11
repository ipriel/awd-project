const express = require('express');
const router = express.Router();
const { ProductMeta } = require('../models');
const { verifyToken, hasRole, hasRoles } = require('./middleware/auth.middleware');

// Create
router.post('/', verifyToken, hasRoles(['admin', 'logistics'], false), (req, res) => {
    ProductMeta.create(req.body, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.status(201).send(doc);
    });
});

// Read
router.get('/:id', verifyToken, hasRole('admin'), (req, res) => {
    ProductMeta.findById(req.params.id, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send(doc);
    });
});

// Update
router.put('/:id', verifyToken, hasRole('admin'), (req, res) => {
    ProductMeta.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send(doc);
    });
});

// Delete
router.delete('/:id', verifyToken, hasRole('admin'), (req, res) => {
    ProductMeta.findOneAndDelete(req.params.id, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send({deleted: doc._id});
    });
});

module.exports = router;