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



router.delete('/:id', (req, res) => {
    const todo = new Todo(req.body);

    todo.findByIdAndRemove(req.params.id);

    if (!todo) return res.status(404).send('The todo with the given ID was not found.');

    res.send(todo);
});
app.put("/:id", async(request, response) => {
    try {
        var todo = await Todo.findById(request.params.id).exec();
        todo.set(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});


router.get("/:id", async(request, response) => {
    try {
        var todo = await Todo.findById(request.params.id).exec();
        response.send(todo);
    } catch (error) {
        response.status(500).send(error);
    }
});


module.exports = router;