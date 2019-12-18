const Joi = require('joi');
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: 1,
        minlength: 5,
        maxlength: 50
    }
});

const Todo = mongoose.model('Genre', TodoSchema);

function validatvalidateTodoeGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

exports.TodoSchema = TodoSchema;
exports.Todo = Todo;
exports.validate = validateTodo;