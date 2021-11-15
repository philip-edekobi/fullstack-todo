const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: String,
    password: String,
    id: Number,
    Todos: Array,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;