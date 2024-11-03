function Total(props) {
  const sumOfExercises = props.parts.reduce((accumulator, part) => {
    return accumulator + part.exercises;
  }, 0);

  return (
    <>
      <p>
        <strong>Number of exercises {sumOfExercises}</strong>
      </p>
    </>
  );
}

export default Total;
