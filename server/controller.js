const User = require("./models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getTodos = async (req, res) => {
    try {
        const { email } = req;
        const user = await User.findOne({ email });
        const { todos } = user;
        return res.status(200).json({ user: user.name, todos: todos });
    } catch (error) {
        return res.status(500).json({ error: "Some internal server error occured" })
    }
}

const addTodo = async (req, res) => {
    try {
        const { id, action } = req.body; const { email } = req;  
        const todo = await User.createTodo(id, action) 
        const user = await User.findOne({ email });
        try{
            user.addTodo(todo);
            await user.save();
            return res.status(200).json({ todos: user.todos });    
        } catch(e){
            return res.status(409).json({ error: "This todo already exists" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Some internal server error occured" })
    }
}

const updateTodo = async (req, res) => {
    try {
        const { email } = req; const { id } = req.params;
        const { completed } = req.body;
        const user = await User.findOne({ email });
        try {
            let index = await user.todos.findIndex(tod => tod.id === id);
            let todo = user.todos[index];
            user.todos[index] = {...todo, completed: completed}
            await user.save();
            return res.status(200).json({ todos: user.todos});
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    } catch (error) {
        res.status(500).json({ error: "Some internal server error occured"});
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { email } = req; const { id } = req.params;
        const user = await User.findOne({ email });
        try {
            user.deleteTodo(id);  
            await user.save();
            return res.status(200).json({ todos: user.todos }); 
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    } catch (error) {
        return res.status(500).json({ error: "Some internal server error"})
    }
}

const deleteAllTodos = async (req, res) => {
    try {
        const { email } = req;
        const user = await User.findOne({ email });
        try{
            user.clearTodos();
            await user.save();
            return res.status(200).json({todos: user.todos });
        } catch (error){
            console.error(error);
            return error;
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Some internal server error occured"});
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if user is present
        const user = await User.findOne({ email });
        if(user && bcrypt.compare(password, user.password)){
            //create a token
            const token = jwt.sign(
                { name: user.name, email: email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2d",
                }
            );
            return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.Node_ENV === "production"
            }).status(200).json({ user: {name: user.name} });
        }
        //if user not found
        return res.status(404).json({ error: "User does not exist, try signing up" });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Some internal error occurred, could not log in. Try again" });
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //check if user exists and handle it
        const old = await User.findOne({ email });
        if(old){
            return res.status(409).send("User already exists! Please login");
        }
        //encrypt the password
        const hashed = await bcrypt.hash(password, 10);
        //create a new user
        const user = new User();
        user.email = email;
        user.name = name;
        user.password = hashed;

        //creating jwt token
        const token = jwt.sign(
            { name: name, email: email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2d",
            }
        );
        await user.save(); //save the user
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.Node_ENV === "production"
        }).status(201).json({ user: {name} });
    } catch (err){
        res.status(500).json({ error: "Some internal error occured. Try again " });
    }
}

const logout = async (req, res) => {
    return res
            .clearCookie("access_token")
            .status(200).json({message: "Logged out sucessfully"})
}

module.exports = {
    login,
    signup,
    logout,
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos
}