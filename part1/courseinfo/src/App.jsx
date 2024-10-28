import { useState } from "react";
import Display from "./components/Display.component";
import Button  from "./components/Button.component";

function App() {
//   const course = {
//   name: "Half Stack application development",
//   parts:  [
//   {
//     name: 'Fundamentals of React',
//     exercises:  10
//   },
//   {
//     name: 'Using props to pass data',
//     exercises: 7
//   },
//   {
//     name: 'State of a component',
//     exercises: 14 
//   }
// ]
// }

  const [counter, setCounter] = useState(0);
  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);


  return (
  // <div>
  //   <Header title={course} />
  //   <Content parts={parts}/>
  //   <Total parts={parts}/>
  // </div>
    <>

      <Display counter={counter} />
      <Button onSmash={increaseByOne} text={'plus'}/>
      <Button onSmash={setToZero} text={'zero'}/> 
      <Button onSmash={decreaseByOne} text={'minus'}/>
    </>
  )
}

export default App
