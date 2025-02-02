import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  const blog = {
    title: "blog entry",
    author: "gandalf",
    url: "site.com",
  };

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container;
  });

  test("blog create", async () => {
    // screen.debug();
    // await screen.findAllByText("blog entry");
    expect(container).toBeDefined();
  });

  test("blog author", async () => {
    // screen.debug();
    expect(container).toHaveTextContent("gandalf");
  });

  test("blog visibility", async () => {
    const toggledSection = container.querySelector(".infoContainer");
    // screen.debug(toggledSection);
    expect(toggledSection).toBeDefined();
    expect(toggledSection).toHaveStyle("display:none");
  });

  test("toggle likes", async () => {
    /**
     * Select container, check if exists, check displays
     */
    const toggledSectionBefore = container.querySelector(".infoContainer");
    expect(toggledSectionBefore).toBeDefined();
    expect(toggledSectionBefore).toHaveStyle("display:none");

    /**
     * Prepare interactivity, select button, click button
     */
    const mockHandler = vi.fn();
    const user = userEvent.setup();
    const button = container.querySelector(".buttonToggle");
    await user.click(button);

    /**
     * Select container again, check displays
     */
    const toggledSectionAfter = container.querySelector(".infoContainer");
    // screen.debug(toggledSectionAfter);
    expect(toggledSectionBefore).toHaveStyle("display:block");
  });

  test("click twice", async () => {
    const likeButton = container.querySelector("likeButton");
    screen.debug(likeButton);
    expect(likeButton).toBeDefined();
  });
});
