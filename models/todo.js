const Joi = require('joi');
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({

    title: {
        type: String,
        minlength: 5,
        maxlength: 50
    },
    name: {
        type: String,
        minlength: 5,
        maxlength: 50
    }

});

const Todo = mongoose.model('Todo', TodoSchema);

function validateTodo(todo) {
    const schema = {
        title: Joi.string().min(3).required(),
        name: Joi.string().min(3).required()

    };

    return Joi.validate(todo, schema);
}

exports.TodoSchema = TodoSchema;
exports.Todo = Todo;
exports.validate = validateTodo;