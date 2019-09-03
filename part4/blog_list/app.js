const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
app.use(morgan("tiny"));
require("dotenv").config();

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = process.env.MONGO_URL;

console.log("Connecting to", mongoUrl);
mongoose
    .connect(mongoUrl, { useNewUrlParser: true })
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
