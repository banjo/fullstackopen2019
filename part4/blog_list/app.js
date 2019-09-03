const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");

console.log("Connecting to", config.MONGODB_URL);

mongoose
    .connect(config.MONGODB_URL, { useNewUrlParser: true })
    .then(() => console.log("Conntected to MongoDB"))
    .catch(error => {
        console.log("Error connecting to MongoDB:", error.message);
    });

app.use(middleware.requestLogger);
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

app.use("/api", blogsRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
