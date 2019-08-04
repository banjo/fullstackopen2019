const express = require("express");
const app = express();
const PORT = 3001;

phonebook = [
    { name: "Antonio", number: "0500050", id: 1 },
    { name: "Dubio", number: "3322", id: 2 },
    { name: "Dracunios", number: "44422", id: 3 }
];

app.get("/api/persons", (req, res) => {
    res.json(phonebook);
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const contact = phonebook.find(phoneContact => phoneContact.id === id);

    if (contact) {
        res.json(contact);
    } else {
        res.status(404).end();
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
