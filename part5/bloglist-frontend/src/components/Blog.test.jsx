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
    screen.debug(toggledSection);
    expect(toggledSection).toBeDefined();
    expect(toggledSection).toHaveStyle("display:none");
  });
});
