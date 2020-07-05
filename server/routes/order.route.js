const express = require('express');
const router = express.Router();
const { Order } = require('../models');
const { verifyToken, isUser, isUserOrHasRoles, hasRole } = require('./middleware/auth.middleware');

// Create
router.post('/', verifyToken, (req, res) => {
    Order.create(req.body, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.status(201).send(doc);
    });
});

// Read
router.get('/:id', verifyToken, isUserOrHasRoles(['admin', 'logistics'], false), (req, res) => {
    Order.findById(req.params.id, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send(doc);
    });
});

// Update
router.put('/:id', verifyToken, hasRole('logistics'), (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send(doc);
    });
});

// Delete
router.delete('/:id', verifyToken, isUser, (req, res) => {
    Order.findOneAndDelete(req.params.id, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send({deleted: doc._id});
    });
});

module.exports = router;