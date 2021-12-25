const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: String,
    password: String,
    Todos: Array,
    email: {unique: true, type: String},
    token: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;