import { useState } from "react";
import Persons from "./components/Persons.component";
import Filter from "./components/Filter.component";
import PersonForm from "./components/PersonForm.component";

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

  const addTelephoneNumber = (event) => {
    event.preventDefault();
    // Trim  input
    const cleanValue = String(newName).trim();
    const cleanNumberValue = String(newNumber).trim();

    // Create object entry
    const newEntry = {
      name: cleanValue,
      number: cleanNumberValue,
      id: persons.length + 1,
    };

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

    if (newNameAlreadyExists) {
      alert(
        `The name - ${newEntry.name} - already exist, please check if the name is correct`
      );
      return;
    }
    if (newNumberAlreadyExists) {
      alert(
        `The number - ${newEntry.number} - already exist, please add ad another number`
      );
      return;
    }

    // Add object to array of persons and reset the values in the input
    setPersons(persons.concat(newEntry));
    setNewName("");
    setNewNumber("");
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

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Filter */}
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      {/* Form input names */}
      <h2>Add new</h2>
      <form onSubmit={addTelephoneNumber}>
        <PersonForm
          addTelphoneNumber={addTelephoneNumber}
          newName={newName}
          handleNameValue={handleNameValue}
          newNumber={newNumber}
          handleNumberValue={handleNumberValue}
        />
      </form>
      {/* Display names */}
      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName} />
    </div>
  );
}

export default App;
