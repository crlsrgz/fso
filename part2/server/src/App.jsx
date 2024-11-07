import axios from "axios";
function App() {
  const promise = axios.get("http://localhost:3001/notes");

  //displays the promise status, in this instance "pending"
  console.log(promise);

  promise.then((response) => {
    // display the response content, Object config, data, headers and request
    console.log(response);
    // use data key to acces the filling
    const notes = response.data;
    console.log(notes);
  });

  // Another shorter version
  axios.get("http://localhost:3001/notes").then((response) => {
    const notes = response.data;
    console.log(notes);
  });

  // assign values
  const renderRes = axios
    .get("http://localhost:3001/notes")
    .then((response) => {
      const notes = response.data;
      console.log(typeof notes);
      console.log(notes[0]);
      return notes;
    });

  // const promise2 = axios.get('http://localhost:3001/foobar')
  // console.log(promise2)

  return (
    <>
      <div>Hello</div>
      <div>{console.log("returned", renderRes)}</div>
      {/* {renderRes.map((item) => {
        return <p key={item.id}>{item.content}</p>;
      })} */}
    </>
  );
}

export default App;
