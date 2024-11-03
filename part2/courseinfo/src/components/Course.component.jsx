import Content from "./Content.component";
import Header from "./Header.component";
import Total from "./Total.component";

const Course = (props) => {
  return (
    <>
      <Header title={props.title} />
      <Content key={props.parts} parts={props.parts} />
      <Total parts={props.parts} />
    </>
  );
};

export default Course;
