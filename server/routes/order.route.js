const express = require('express');
const router = express.Router();
const { Order } = require('../models/order.model');
const { verifyToken, isUser, isUserOrHasRoles, hasRole } = require('./plugins/auth.middleware');
const { stackOrderAscending } = require('d3');

// Create
router.post('/', verifyToken, (req, res) => {
    Order.create(req.body, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.status(201).send(doc);
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

// Read
router.get('/analytics/income/daily', /*verifyToken, hasRole('admin'),*/ (req, res) => {
    Order.aggregate([
        { 
            $group: {
                _id: { $dateToString: { format: '%d-%m', date: '$date' } },
                value: { $sum: '$totalPrice' }
            }
        },
        {
            $project: {
                name: '_id',
                value: 1,
                _id: 0
            }
        }
    ]).exec((err, docs) => {
        if (err) {
            return res.status(400).send(err);
        }

        if(docs.length == 0) {
            const date = new Date();
            docs.push({name: date.getDate()+'-'+(date.getMonth()+1), value: 0});
        }
        res.send(docs);
    });
});

router.get('/analytics/income/today', /* verifyToken, hasRole('admin'), */ (req, res) => {
    Order.aggregate([
        {
            $match: {
                date: { $eq: new Date() }
            }
        },
        {
            $group: {
                _id: '$date',
                income: { $sum: "$totalPrice" }
            }
        }
    ]).exec((err, doc) => {
        if (err) {
            return res.status(400).send(err);
        }

        if (doc && doc.length == 1)
            res.send({data: doc[0].income});
        else
            res.send({data: 0});
    });
});

router.get('/:id', verifyToken, isUserOrHasRoles(['admin', 'logistics'], false), (req, res) => {
    Order.findById(req.params.id, (err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.send(doc);
    });
});

module.exports = router;