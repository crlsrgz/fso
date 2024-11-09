import { useState } from "react";
import Note from "./components/Note";
import axios from "axios";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState(`a new note...`);
  const [showAll, setShowAll] = useState(true);

  // axios.get("http://localhost:3001/notes").then((response) => {
  //   // console.log(response.data);
  //   setNotes(response.data);
  // });

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`);
    const url = `http://localhost:3001/notes/${id}`;
    // Make a copy, never mutate state
    const note = notes.find((n) => n.id === id);
    console.log(note);
    const changeNote = { ...note, important: !note.important };

    axios.put(url, changeNote).then((response) => {
      // replaces all notes
      setNotes(notes.map((n) => (n.id === id ? response.data : n)));
    });
  };

  /**
   * addNote function
   * 1. prevents the default event of the form
   * 2. creates a new object using the newNote state.
   * 3. important key is set randomly to a boolean
   * 4. the the id key is set using the length of the array and adding  1
   * @param {MyEvent} event - the event of the input
   * @listens MyEvent
   */
  const addNote = (event) => {
    event.preventDefault();
    // console.log("button clicked", event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: String(notes.length + 1),
    };

    axios.post("http://localhost:3001/notes", noteObject).then((response) => {
      console.log(response);
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    // console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => {
              toggleImportanceOf(note.id);
            }}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
