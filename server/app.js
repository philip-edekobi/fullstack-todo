const express = require('express');
const app = express();
const cors = require('cors');
const todoRoutes = require("./routes/todos.js");

const mongoose = require('mongoose');

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use("/todos", todoRoutes);

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(res => app.listen(5000, () => console.log("server is running on port 5000"))).catch(err => console.log(err));