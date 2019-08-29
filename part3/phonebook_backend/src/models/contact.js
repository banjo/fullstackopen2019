require("dotenv").config();
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
mongoose.set("useFindAndModify", false);

// save URL as a variable
const url = process.env.MONGODB_URL;

// connect to database
mongoose.connect(url, { useNewUrlParser: true });

// create schema for contact
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minlength: 3 },
    number: {
        type: String,
        required: true,
        unique: true,
        minlength: 8
    }
});
contactSchema.plugin(uniqueValidator);

// update ID to string
contactSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Contact", contactSchema);
