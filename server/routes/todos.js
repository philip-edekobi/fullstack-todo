const router = require("express").Router();

router.use((req, res, next) => {
    let type = req.method.toLowerCase();
    if(type === "delete" || type === "post" || type ==="put"){
        res.writeHead(200, {
            Connection: "keep-alive",
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin" : "*"
        });
        res.flushHeaders();
    }
    next();
});

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