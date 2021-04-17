const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

const userRoute = require("./routes");

const app = express();

mongoose.connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("Successfully connected to database"))
  .catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use(cors());

app.use("/auth", userRoute);

module.exports = app;