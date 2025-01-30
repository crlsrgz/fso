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
});

// test("renders blogEntry", () => {
//   const blog = {
//     title: "entry",
//     author: "gandalf",
//     url: "site.com",
//   };

//   const mockHandler = vi.fn();

//   const { container } = render(<Blog blog={blog} onDelete={mockHandler} />);
//   screen.debug();
//   const div = container.querySelector(".blog");

//   expect(div).toBeDefined();

// });
