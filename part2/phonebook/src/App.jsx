import { useEffect, useState } from "react";
import Persons from "./components/Persons.component";
import Filter from "./components/Filter.component";
import PersonForm from "./components/PersonForm.component";
import services from "./services/requests";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    { name: "John Doe", number: "39-23-6723122", id: 5 },
    { name: "Jane Doe", number: "39-23-623122", id: 6 },
    { name: "John Smith", number: "39-23-6411122", id: 7 },
    { name: "Jane Smith", number: "39-23-6423322", id: 8 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    services.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addTelephoneNumber = (event) => {
    event.preventDefault();

    // Trim  input
    const cleanValue = String(newName).trim();
    const cleanNumberValue = String(newNumber).trim();

    // Create object entry
    const newEntry = {
      name: cleanValue,
      number: cleanNumberValue,
      // id: persons.length + 1,
    };

    // POST
    services.create(newEntry).then((response) => {
      newEntry.id = response.id;
      // Prepare booleans
      let newNameAlreadyExists = false;
      let newNumberAlreadyExists = false;

      const arrayToCheck = [...persons];

      arrayToCheck.forEach((item) => {
        if (item.name.toLowerCase() === newEntry.name.toLowerCase()) {
          newNameAlreadyExists = true;
        }
        if (item.number.toLowerCase() === newEntry.number.toLowerCase()) {
          newNumberAlreadyExists = true;
        }
      });

      if (newNameAlreadyExists && newNumberAlreadyExists) {
        alert(
          `The name - ${newEntry.name} - already exist, please check if the name is correct`
        );
        return;
      }

      // Add object to array of persons and reset the values in the input
      setPersons(persons.concat(newEntry));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameValue = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberValue = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  function deleteEntry(event) {
    const id = event.target.dataset.buttonId;
    const entryName = document.getElementById(id);
    if (
      window.confirm(`Do you want to delete the entry ${entryName.textContent}`)
    ) {
      axios.delete(`http://localhost:3001/persons/${id}`).then((response) => {
        console.log(response);
        services.getAll().then((response) => setPersons(response));
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Filter */}
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      {/* Form input names */}
      <h2>Add new</h2>
      <PersonForm
        addTelephoneNumber={(e) => {
          addTelephoneNumber(e);
        }}
        newName={newName}
        handleNameValue={handleNameValue}
        newNumber={newNumber}
        handleNumberValue={handleNumberValue}
      />
      {/* Display names */}
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchName={searchName}
        deleteEntry={(e) => {
          deleteEntry(e);
        }}
      />
    </div>
  );
}

export default App;
