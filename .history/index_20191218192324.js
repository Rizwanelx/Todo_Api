const mongoose = require('mongoose');
const todos = require('./routes/todos');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017/app')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/todo', todos);


const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));