import NewNote from "./components/NewNote.component";
import Notes from "./components/Note.component";

const generateId = () => {
  Number((Math.random() * 100000).toFixed(0));
};

const App = () => {
  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
