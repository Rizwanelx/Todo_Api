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

// router.put('/:id', async(req, res) => {
//     const { error } = validate(req.body);
//     const todo = new Todo(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     todo.findByIdAndUpdate(req.params.id, { name: req.body.name, title: req.body.title }, {
//         new: true
//     });

//     if (!todo) return res.status(404).send('The todo with the given ID was not found.');

//     res.send(todo);
// });
router.put("/:id", (req, res, next) => {
    const todo = new Todo({
        title: req.body.title,
        name: req.body.name
    });
    Todo.findByIdAndUpdate({ id: req.params.id }, todo).then(result => {
        res.status(200).send('The todo with the given ID was not found.');
    });
});
router.delete('/:id', (req, res) => {
    const todo = new Todo(req.body);

    todo.findByIdAndRemove(req.params.id);

    if (!todo) return res.status(404).send('The todo with the given ID was not found.');

    res.send(todo);
});

router.get('/:id', (req, res) => {
    const todo = new Todo(req.body);

    todo.findById(req.params.id);

    if (!todo) return res.status(404).send('The todo with the given ID was not found.');

    res.send(todo);
});


module.exports = router;