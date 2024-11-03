import Note from "./components/Note";

function App({ notes }) {
  console.log(notes);
  return (
    <>
      <div>
        <h1>Notes</h1>
        <ul>
          {notes.map((note) => {
            return <Note key={note.id} note={note} />;
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
