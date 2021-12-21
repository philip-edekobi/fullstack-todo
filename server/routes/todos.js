const router = require("express").Router();

const {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos
} = require("../controllers/todos.js");

router.get('/', getTodos);

router.post('/', addTodo);

router.put('/:id', updateTodo);

router.delete('/', deleteAllTodos);

router.delete('/:id', deleteTodo);

module.exports = router;