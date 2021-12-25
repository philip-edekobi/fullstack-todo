const express = require('express');
const app = express();
const cors = require('cors');
const todoRoutes = require("./routes/todos.js");

const mongoose = require('mongoose');

app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use("/api/todos", todoRoutes);

require("dotenv").config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
    .then(res => app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`)))
    .catch(err => console.log(err));