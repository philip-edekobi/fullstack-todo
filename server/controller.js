const User = require("./models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getTodos = (req, res) => {
}

const addTodo = async (req, res) => {
    const { completed, id, action } = req.body;

}

const updateTodo = (req, res) => {
}

const deleteTodo = (req, res) => {
}

const deleteAllTodos = (req, res) => {
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
                    expiresIn: "2h",
                }
            );
            return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.Node_ENV === "production"
            }).status(200).json({ user: {name: user.name, email} });
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
                expiresIn: "2h",
            }
        );
        await user.save(); //save the user
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.Node_ENV === "production"
        }).status(201).json({ user: {name, email} });
    } catch (err){
        res.status(500).json({ error: "Some internal error occured. Try again " });
    }
}

module.exports = {
    login,
    signup,
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos
}