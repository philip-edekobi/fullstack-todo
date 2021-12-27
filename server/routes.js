const router = require("express").Router();
const authMiddleware = require("./middleware/authMiddleware");

const {
    login,
    signup,
    logout,
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos
} = require("./controller.js");

router.get('/', authMiddleware, getTodos);

router.get('/permit', authMiddleware, (req, res) => res.status(200));

router.post('/', authMiddleware, addTodo);

router.patch('/:id', authMiddleware, updateTodo);

router.delete('/all', authMiddleware, deleteAllTodos);

router.delete('/:id', authMiddleware, deleteTodo);

router.post('/login', login);

router.post('/signup', signup);

router.post("/logout", logout)

module.exports = router;