require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json);

const port = process.env.Port || 5000;

app.listen(port, () => {
    console.log(`Server Is Running ${port}`);
})