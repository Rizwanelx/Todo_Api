const { Todo, validate } = require('../models/todo');
const express = require('express');
const router = express.Router();




router.get('/', (req, res) => {
    const todos = await Todo.find().sort('name');
    res.send(todos);
});

router.post('/', (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let todo = new Todo({
        title: req.body.title,
        name: req.body.name,
    });
    todo = todo.save();

    res.send(todo);
});

router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const todo = await Todo.findByIdAndUpdate(req.params.id, { name: req.body.name, title: req.body.title, }, {
        new: true
    });

    if (!todo) return res.status(404).send('The todo with the given ID was not found.');

    res.send(todo);
});

router.delete('/:id', async(req, res) => {
    const todo = await Todo.findByIdAndRemove(req.params.id);

    if (!todo) return res.status(404).send('The todo with the given ID was not found.');

    res.send(todo);
});

router.get('/:id', async(req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).send('The todo with the given ID was not found.');

    res.send(todo);
});

module.exports = router;