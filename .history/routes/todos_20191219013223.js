const { Todo, validate } = require('../models/todo');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(todos)
    })
})

router.post('/', (req, res) => {
    const todo = new Todo(req.body);

    todo.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            brand: doc
        })
    })
})




module.exports = router;