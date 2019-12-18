const mongoose = require('mongoose');
const todos = require('./routes/todos');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost:27017/app')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use('/api/todo', todos);


const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));