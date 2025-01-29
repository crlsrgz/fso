import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";
import Togglable from "./Togglable";

describe("<Togglable />", () => {
  let container;

  /**
   * Run the function before each test to render the component
   */
  beforeEach(() => {
    // Render the component
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container;
  });

  test("renders its children", async () => {
    /**
     * wait for the elements to appear in the DOM,
     */
    await screen.findAllByText("togglable content");
  });

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent");
    /**
     * Check if the queried div has the style display none
     */
    expect(div).toHaveStyle("display:none;");
  });
  test("after clikcking the buttun, children are displayed", async () => {
    /**
     * Initialize a simulation, setup() returns an object used to call click(), type(), hover(), simulating user actions
     */
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display:none");
  });
});
