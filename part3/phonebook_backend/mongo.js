const mongoose = require("mongoose");
let getContacts = false;
// check for correct amount of arguments
if (process.argv.length === 3) {
    getContacts = true; // print contacts after connection to server is established
} else if (process.argv.length < 5) {
    console.log("Usage: node mongo.js password name number");
    process.exit(1);
}

// get argvs
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

// save URL as a variable
const url = `mongodb+srv://fullstack:${password}@fullstackcluster-ww76q.mongodb.net/contacts?retryWrites=true&w=majority`;

// connect to database
mongoose.connect(url, { useNewUrlParser: true });

// create schema for contact
const contactSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Contact = mongoose.model("Contact", contactSchema);

if (getContacts) {
    console.log("Phonebook:");
    Contact.find({}).then(result => {
        result.forEach(note => {
            console.log(note.name, note.number);
        });
        mongoose.connection.close();
        process.exit(0);
    });
}

const contact = new Contact({
    name: name,
    number: number
});

contact.save().then(response => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
});
