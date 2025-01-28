import { render, screen } from "@testing-library/react";
import Note from "./Note";

test("renders content", () => {
  const note = {
    content: "component testing is done with react-testing-library",
    important: true,
  };
  const { container } = render(<Note note={note} />);
  const div = container.querySelector(".note");
  console.log(container);
  expect(div).toHaveTextContent(
    "component testing is done with react-testing-library"
  );
});
