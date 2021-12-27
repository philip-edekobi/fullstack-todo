const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require("./routes.js");

const mongoose = require('mongoose');
const path = require('path');

app.use(express.json());

app.use(cookieParser());

app.use("/api/", routes);

require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

mongoose.connect(process.env.MONGO_URL)
    .then(res => app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`)))
    .catch(err => console.log(err));