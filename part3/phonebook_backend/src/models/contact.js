require("dotenv").config();
const mongoose = require("mongoose");

// save URL as a variable
const url = process.env.MONGODB_URL;

// connect to database
mongoose.connect(url, { useNewUrlParser: true });

// create schema for contact
const contactSchema = new mongoose.Schema({
    name: String,
    number: String
});

// update ID to string
contactSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Contact", contactSchema);
