const express = require("express");
const app = express();
const PORT = 3001;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

phonebook = [
    { name: "Antonio", number: "0500050", id: 1 },
    { name: "Dubio", number: "3322", id: 2 },
    { name: "Dracunios", number: "44422", id: 3 }
];

// function to generate a new ID
const generateId = () => {
    const currentIds = phonebook.map(contact => contact.id);
    let newId;

    while (true) {
        newId = Math.floor(Math.random() * 100) + 1;

        if (!currentIds.includes(newId)) {
            break;
        }
    }

    return newId;
};

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
    res.json(phonebook);
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

    // check if contact exists
    const currentContacts = phonebook.map(contact => contact.name);
    if (currentContacts.includes(newContact.name)) {
        return res.status(400).json({
            error: "the name already exists in the phonebook"
        });
    }

    const contact = {
        name: newContact.name,
        number: newContact.number,
        id: generateId()
    };

    phonebook = phonebook.concat(contact);

    res.json(phonebook);
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
