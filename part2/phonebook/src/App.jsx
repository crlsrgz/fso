import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const addTelphoneNumber = (event) => {
    event.preventDefault();
    const cleanValue = String(newName).trim();
    const cleanNumberValue = String(newNumber).trim();

    const newEntry = {
      name: cleanValue,
      number: cleanNumberValue,
    };

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
      console.log("already here");
      return;
    }
    if (newNumberAlreadyExists) {
      alert(
        `The number - ${newEntry.number} - already exist, please add ad another number`
      );
      console.log("Number already here");
      return;
    }
    setPersons(persons.concat(newEntry));
    setNewName("");
    setNewNumber("");
  };

  const handleNameValue = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberValue = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
    // console.log(searchName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Filter */}
      <form>
        <div>
          search name: <input value={searchName} onChange={handleSearchName} />
        </div>
      </form>
      {/* Form input names */}
      <h2>Add new</h2>
      <form onSubmit={addTelphoneNumber}>
        <div>
          name: <input value={newName} onChange={handleNameValue} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberValue} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      {/* Display names */}
      <h2>Numbers</h2>

      {persons.map((item) => {
        if (item.name.toLowerCase().includes(searchName.toLowerCase()) || "") {
          return <div key={item.name}>{`${item.name} ${item.number}`} </div>;
        }
      })}
    </div>
  );
}

export default App;
