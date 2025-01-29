import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";
import Note from "./Note";
import Togglable from "./Togglable";

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

describe("<Togglable />", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container;
  });

  test("renders its children", async () => {
    await screen.findAllByText("togglable content");
  });

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display:none");
  });
  test("after clikcking the buttun, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display:none");
  });
});
