const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
app.use(morgan("tiny"));
const config = require("./utils/config");
const Blog = require("./models/blog");

console.log("Connecting to", config.MONGODB_URL);

mongoose
    .connect(config.MONGODB_URL, { useNewUrlParser: true })
    .then(() => console.log("Conntected to MongoDB"))
    .catch(error => {
        console.log("Error connecting to MongoDB:", error.message);
    });

app.use(cors());
app.use(bodyParser.json());

app.get("/api/blogs", (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs);
    });
});

app.post("/api/blogs", (request, response) => {
    const blog = new Blog(request.body);

    blog.save().then(result => {
        response.status(201).json(result);
    });
});

module.exports = app;
