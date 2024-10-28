import Content from "./components/Content.component";
import Header from "./components/Header.component";
import Total from "./components/Total.component";

function App() {
  const course = {
  name: "Half Stack application development",
  parts:  [
  {
    name: 'Fundamentals of React',
    exercises:  10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14 
  }
]


  return (<div>
    <Header title={course} />
    <Content parts={parts}/>
    <Total parts={parts}/>
  </div>)
}

export default App
