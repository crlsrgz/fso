import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";
import Note from "./Note";

test("renders content", () => {
  const note = {
    content: "component testing is done with react-testing-library",
    important: true,
  };
  const { container } = render(<Note note={note} />);
  screen.debug();
  const div = container.querySelector(".note");
  expect(div).toHaveTextContent(
    "component testing is done with react-testing-library"
  );
});

test("clicking the button calls event handler once", async () => {
  const note = {
    content: "component testing is done with react-testing-library",
    important: true,
  };

  const mockHandler = vi.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);
  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("renders contents not working", () => {
  const note = {
    content: "Does not work anymore :(",
    important: true,
  };

  render(<Note note={note} />);
  const element = screen.findByText("Does not work anymore :(", {
    exact: false,
  });
  expect(element).toBeDefined();
});

test("does not render this", () => {
  const note = {
    constent: "This is a reminder",
    important: true,
  };
  render(<Note note={note} />);

  const element = screen.queryByText("do not want this thing to be rendered");
  expect(element).toBeNull();
});
