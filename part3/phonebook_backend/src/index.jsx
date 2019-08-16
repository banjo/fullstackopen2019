require("dotenv").config();
const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const Contact = require("./models/contact");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));

const PORT = process.env.PORT || 3001;
const TOKEN =
    ":method :url :status :res[content-length] - :response-time ms :contact";

// reset morgan to default after post request
const resetMorgan = (req, res, next) => {
    morgan.token("contact", (req, res) => "");
    next();
};
app.use(resetMorgan);

// setup temp morgan tokan
morgan.token("contact", (req, res) => "");
app.use(morgan(TOKEN));

// API FOR INFO
app.get("/info", (req, res) => {
    const str = res.send(
        `Phonebook has info of ${phonebook.length} people
        <br>
        ${new Date()}`
    );
});

// API FOR PHONEBOOK
app.get("/api/persons", (req, res) => {
    Contact.find({}).then(contacts => {
        res.json(contacts);
    });
});

// GET ENTRY
app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const contact = phonebook.find(phoneContact => phoneContact.id === id);

    if (contact) {
        res.json(contact);
    } else {
        res.status(404).end();
    }
});

// ADD ENTRY
app.post("/api/persons", (req, res) => {
    const newContact = req.body;

    // configure morgan for post request
    morgan.token("contact", (req, res) => JSON.stringify(newContact));

    // check for content
    if (!newContact) {
        return res.status(400).json({
            error: "content is missing"
        });
    }

    // check for name and number
    if (!newContact.name || !newContact.number) {
        return res.status(400).json({
            error: "name or number is missing"
        });
    }

    const contact = new Contact({
        name: newContact.name,
        number: newContact.number
    });

    contact.save().then(savedContact => {
        res.json(savedContact.toJSON());
    });
});

// DELETE ENTRY
app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    phonebook = phonebook.filter(contact => contact.id !== id);

    res.send(JSON.stringify(phonebook));
    res.status(204).end();
});

// PORT TO LISTEN TO
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
