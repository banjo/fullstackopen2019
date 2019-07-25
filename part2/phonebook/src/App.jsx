import React, { useState } from "react";
import Numbers from "./components/Numbers";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" }
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [filteredPersons, setFilteredPersons] = useState([]);

    const addPerson = event => {
        event.preventDefault();
        const allNames = persons.map(person => person.name);

        // Warning if duplicate
        if (allNames.includes(newName)) {
            alert(`${newName} is already added to the phonebook`);
            return;
        }

        // Warning if empty
        if (newName === "") {
            alert(`You cannot add an empty string`);
            return;
        }

        // create contact
        const contact = {
            name: newName,
            number: newNumber
        };

        // add contact and reset form
        setPersons(persons.concat(contact));
        setNewName("");
        setNewNumber("");
    };
    const handleNameChange = event => setNewName(event.target.value);
    const handleNumberChange = event => setNewNumber(event.target.value);
    const handleFilterChange = event => {
        setNewFilter(event.target.value);

        let filter = event.target.value;
        const filtered = persons.filter(person =>
            person.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredPersons(filtered);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            filter shown with{" "}
            <input value={newFilter} onChange={handleFilterChange} />
            <h2>Add a new contact</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <Numbers phonebook={persons} filter={filteredPersons} />
            {/* TODO: FIX FILTER */}
        </div>
    );
};

export default App;
