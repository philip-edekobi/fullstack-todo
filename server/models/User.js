const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: String,
    password: String,
    todos: Array,
    email: {unique: true, type: String},
    token: String
});

UserSchema.statics.createTodo = function(id, action){
    return { id, action, completed: false }
}

UserSchema.methods.addTodo = function(newTodo){
    let similar = this.todos.filter(todo => todo.action === newTodo.action);
    console.log(similar)
    if (similar.length > 0){
        throw Error("This todo already exists");
    }
    this.todos.push(newTodo);
}

UserSchema.methods.deleteTodo= function(id){
    this.todos = this.todos.filter(todo => todo.id !== id)
}

UserSchema.methods.clearTodos = function(){
    this.todos = [];
}

const User = mongoose.model("User", UserSchema);

module.exports = User;