const Todo = require("../models/Todo.js");

const getTodos = (req, res) => {
    Todo.find({})
        .then(result => res.status(200).json({ result }))
        .catch(err => res.status(500).json({msg: err}));
}

const addTodo = (req, res) => {
    Todo.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch(err => res.status(500).json( {msg: err}));
}

const updateTodo = (req, res) => {
    Todo.findOneAndUpdate({id : req.params.id}, req.body, {runValidators: true, new: true})
        .then(result => res.status(200).json({ result}))
        .catch(err => res.status(404).json({msg: "Todo does not exist"}));
}

const deleteTodo = (req, res) => {
    Todo.findOneAndDelete({id: req.params.id})
        .then(result => res.status(200).json({ result }))
        .catch(err => res.status(404).json({msg: "Todo does not exist"}))
}

const deleteAllTodos = ((req, res) => {
    Todo.deleteMany({})
        .then(result => res.status(200).json({result}))
        .catch(err => res.status(404).json({msg: "There are no todos to delete"}));
});

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos
}