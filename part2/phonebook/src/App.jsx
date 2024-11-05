import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addTelphoneNumber = (event) => {
    event.preventDefault();

    const newEntry = {
      name: newName,
    };

    let newEntryAlreadyExists = false;
    const arrayToCheck = [...persons];

    arrayToCheck.forEach((item) => {
      if (item.name === newEntry.name) {
        console.log("already here");
        newEntryAlreadyExists = true;
      }
    });
    // console.log(newEntry.name);
    // console.log(arrayToCheck.includes(newEntry));
    // console.log(arrayToCheck);
    if (newEntryAlreadyExists) {
      setNewName("");

      return;
    }
    setPersons(persons.concat(newEntry));
    setNewName("");
  };

  // function checkIfEntryAlreadyExists(persons, newEntry) {}

  const handleInputValue = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addTelphoneNumber}>
        <div>
          name: <input value={newName} onChange={handleInputValue} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((item) => {
        return <div key={item.name}>{item.name}</div>;
      })}
    </div>
  );
}

export default App;
