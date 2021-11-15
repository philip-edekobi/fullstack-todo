const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    content: String,
    completed: Boolean,
    id: Number,
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;