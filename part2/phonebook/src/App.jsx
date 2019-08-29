import React, { useState, useEffect } from "react";
import phonebook from "./services/phonebook";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [infoBox, setInfoBox] = useState({ message: null, isSuccess: true });

    // effect hook for json server
    useEffect(() => {
        phonebook.getAll().then(phonebook => {
            setPersons(phonebook);
        });
    }, []);

    // update the contact and forms locally
    const fixContact = contact => {
        setPersons(persons.concat(contact));
    };

    // update the filter with new addition
    const updateFilter = contact => {
        // if (filteredPersons.length > 0) {
        //     setFilteredPersons(filteredPersons.concat(contact));
        // }
        if (newName.includes(newFilter) && newFilter.length > 0) {
            setFilteredPersons(filteredPersons.concat(contact));
        }
    };

    // update filter with changing number
    const updateFilterForNewNumber = contact => {
        setFilteredPersons(
            filteredPersons.map(person =>
                person.id === contact.id ? contact : person
            )
        );
    };

    // add person on click
    const addPerson = event => {
        event.preventDefault();
        const allNames = persons.map(person => person.name);

        // reset filter if it has length 0
        if (newFilter.length === 0) {
            setFilteredPersons([]);
        }

        // create contact
        const contact = {
            name: newName,
            number: newNumber
        };

        console.log("new contact before id change", contact);

        // if duplicate, update number
        if (allNames.includes(newName)) {
            if (
                window.confirm(
                    `${newName} is already added to the phonebook, would you like to update the number?`
                )
            ) {
                // change the ID of contact to the ID of the person who should be changed
                contact.id = persons.filter(
                    person => person.name === contact.name
                )[0].id;

                // update filtered results
                updateFilterForNewNumber(contact);

                // TODO: FIX BUG WHERE YOU CANT UPDATE NUMBER
                console.log("new contact after id change", contact);

                // add to phonebook
                phonebook
                    .updateContact(contact)
                    .then(() => {
                        setPersons(
                            persons.map(person =>
                                person.id === contact.id ? contact : person
                            )
                        );
                    })
                    .catch(error => {
                        if (error.response.status === 404) {
                            console.log(error);

                            setInfoBox({
                                message: `Information of ${contact.name} has already been removed from the server.`,
                                isSucess: false
                            });
                            setTimeout(
                                () =>
                                    setInfoBox({
                                        message: null,
                                        isSuccess: false
                                    }),
                                5000
                            );
                        } else {
                            setInfoBox({
                                message: `Could not update number`,
                                isSucess: false
                            });
                            setTimeout(
                                () =>
                                    setInfoBox({
                                        message: null,
                                        isSuccess: false
                                    }),
                                5000
                            );
                        }
                    });
            }
            return;
        }

        // Warning if empty
        if (newName === "" || newNumber === "") {
            alert(`You cannot add an empty string`);
            return;
        }

        // update filter if search is active
        updateFilter(contact);

        // reset forms
        setNewName("");
        setNewNumber("");

        // add contact locally
        // fixContact(contact);

        // add to backend server and to webpage
        phonebook
            .add(contact)
            .then(contact => {
                setInfoBox({
                    message: `Successfully added ${newName}`,
                    isSuccess: true
                });
                setTimeout(
                    () => setInfoBox({ message: null, isSuccess: false }),
                    5000
                );
            })
            .catch(error => {
                alert(`Could not add ${contact.name}`);
            });

        // download latest contacts to get correct ID
        phonebook.getAll().then(phonebook => {
            setPersons(phonebook);
        });
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter
                value={newFilter}
                setNewFilter={setNewFilter}
                setFilteredPersons={setFilteredPersons}
                persons={persons}
            />

            <h2>Add a new contact</h2>
            <Notification message={infoBox} />
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
            />
            <h2>Numbers</h2>
            <Numbers
                contacts={persons}
                filteredPersons={filteredPersons}
                setFilteredPersons={setFilteredPersons}
                newFilter={newFilter}
                setContacts={setPersons}
            />
        </div>
    );
};

export default App;
