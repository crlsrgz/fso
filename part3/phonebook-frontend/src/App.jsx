import { useEffect, useState } from "react";
import Persons from "./components/Persons.component";
import Filter from "./components/Filter.component";
import PersonForm from "./components/PersonForm.component";
import services from "./services/requests";

function Messagefeedback(props) {
  if (props.message === null) {
    return "";
  }
  return (
    <div className={props.message === "add" ? "accepted" : "error"}>
      {props.message === "add"
        ? ` Contact ${props.user} added`
        : props.message === "info"
        ? ` Info: ${props.user} has already been removed from the server`
        : `Missing values, check your input and try again`}
    </div>
  );
}

function hideFeedbackMessage(setFunction, value, waitTime = 3000) {
  setTimeout(() => {
    setFunction(value);
  }, waitTime);
}

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [messageTextFeedback, setMessageTextFeedback] = useState(null);
  const [messageNameFeedback, setMessageNameFeedback] = useState("");

  useEffect(() => {
    services.getAllReq().then((response) => {
      setPersons(response);
    });
  }, []);

  const addTelephoneNumber = (event) => {
    event.preventDefault();
    if (
      newName === "" ||
      newName === false ||
      newNumber === "" ||
      newNumber === false
    ) {
      setMessageTextFeedback("miss");
      hideFeedbackMessage(setMessageTextFeedback, null);
      console.log("missing values");
      return;
    }
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
    services.createEntryReq(newEntry).then((response) => {
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
      setMessageNameFeedback(newEntry.name);
      setMessageTextFeedback("add");
      hideFeedbackMessage(setMessageTextFeedback, null);

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
    const entryName = document.getElementById(id).querySelector(".name");

    if (
      window.confirm(`Do you want to delete the entry ${entryName.textContent}`)
    ) {
      // axios.delete(`http://localhost:3001/persons/${id}`).then(() => {
      //   services.getAllReq().then((response) => setPersons(response));
      // });
      services
        .deleteEntryReq(id)
        // eslint-disable-next-line no-unused-vars
        .then((_res) => {
          setMessageNameFeedback(entryName.textContent);
          setMessageTextFeedback("info");
          hideFeedbackMessage(setMessageTextFeedback, null);
        })
        .catch((err) => {
          console.log("ups", err);
          setMessageNameFeedback(entryName.textContent);
          setMessageTextFeedback("info");
          hideFeedbackMessage(setMessageTextFeedback, null);
        });
    }

    services.getAllReq().then((response) => setPersons(response));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Filter */}
      <Messagefeedback
        message={messageTextFeedback}
        user={messageNameFeedback}
      />
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
