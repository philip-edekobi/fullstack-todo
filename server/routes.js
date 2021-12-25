const router = require("express").Router();

const {
    login,
    signup,
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos
} = require("./controller.js");

router.get('/', getTodos);

router.post('/', addTodo);

router.patch('/:id', updateTodo);

router.delete('/all', deleteAllTodos);

router.delete('/:id', deleteTodo);

router.post('/login', login);

router.post('/signup', signup);

module.exports = router;