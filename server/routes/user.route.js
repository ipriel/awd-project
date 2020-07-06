const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { verifyToken, isUser } = require('./middleware/auth.middleware');

// Create
router.post('/', verifyToken, (req, res) => {
    User.create(req.body, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.status(201).send(doc);
    });
});

// Read
router.get('/:id', verifyToken, isUser, (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send(doc);
    });
});

// Update
router.put('/:id', verifyToken, isUser, (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send(doc);
    });
});

module.exports = router;