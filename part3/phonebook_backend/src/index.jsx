require("dotenv").config();
const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const Contact = require("./models/contact");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
const TOKEN =
    ":method :url :status :res[content-length] - :response-time ms :contact";

// logger
const requestLogger = (request, response, next) => {
    console.log("Method:", request.method);
    console.log("Path:  ", request.path);
    console.log("Body:  ", request.body);
    console.log("---");
    next();
};

app.use(requestLogger);
app.use(express.static("build"));

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
    Contact.find({})
        .then(contacts => {
            const str = res.send(
                `Phonebook has info of ${contacts.length} people
            <br>
            ${new Date()}`
            );
        })
        .catch(error => console.log(error));
});

// API FOR PHONEBOOK
app.get("/api/persons", (req, res) => {
    Contact.find({})
        .then(contacts => {
            res.json(contacts);
        })
        .catch(error => {
            console.log(error);
            res.status(404).end();
        });
});

// GET ENTRY
app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;

    Contact.findById(id)
        .then(contact => {
            if (contact) {
                res.json(contact.toJSON());
            } else {
                res.status(204).end();
            }
        })
        .catch(error => next(error));
});

// ADD ENTRY
app.post("/api/persons", (req, res, next) => {
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

    contact
        .save()
        .then(savedContact => {
            res.json(savedContact.toJSON());
        })
        .catch(error => next(error));
});

// UPDATE ENTRY
app.put("/api/persons/:id", (req, res, next) => {
    const body = req.body;
    const id = req.params.id;

    const contact = {
        name: body.name,
        number: body.number
    };

    Contact.findByIdAndUpdate(id, contact, { new: true })
        .then(updatedContact => {
            res.json(updatedContact.toJSON());
        })
        .catch(error => next(error));
});

// DELETE ENTRY
app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;

    Contact.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

// Unknown endpoint handler
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// Error handler
const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError" && error.kind == "ObjectId") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};
app.use(errorHandler);

// PORT TO LISTEN TO
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
