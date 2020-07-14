const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { verifyToken, isUser } = require('./plugins/auth.middleware');
//const { getUniqueVisitors } = require('./plugins/bigquery.service');

// Create
router.post('/', verifyToken, (req, res) => {
    User.create(req.body, (err, doc) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).send(doc);
    });
});

// Read
router.get('/:id', verifyToken, isUser, (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send(doc);
    });
});

router.get('/count/registered', verifyToken, hasRole('admin'), (req, res) => {
    User.countDocuments({ showInStore: true }, (err, count) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send(count);
    });
});

//TODO: Migrate to biqquery
router.get('/count/visitors', verifyToken, hasRole('admin'), (req, res) => {
    /* getUniqueVisitors()
        .then(rows => res.send(rows))
        .catch(err => res.status().send(err)); */
    User.countDocuments({ showInStore: true }, (err, count) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send(Math.round(Math.random() * count));
    });
});

// Update
router.put('/:id', verifyToken, isUser, (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send(doc);
    });
});

module.exports = router;