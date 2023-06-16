const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');
const app = express();
require("dotenv").config();

const db = process.env.db;

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected"))
    .catch(console.error);


app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.status(200).json(todos);
})

app.get('/', async (req, res) => {
    res.status(200).json("hey!");
})

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.status(200).json(todo);
})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json(result);
})

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.status(200).json(todo);
})


app.listen(port, () => console.log(`Server started on port ${port}`));