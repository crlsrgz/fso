import Part from "./Part.component";

function Content(props) {
  return (
    <div>
      {props.parts.map((part) => {
        return (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        );
      })}
    </div>
  );
}

export default Content;
