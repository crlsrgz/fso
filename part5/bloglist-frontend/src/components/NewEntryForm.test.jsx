import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import NewEntryForm from "./NewEntryForm";
import userEvent from "@testing-library/user-event";

test("<NewEntryForm /> new blog created", async () => {
  const mockCreateBlogEntry = vi.fn();
  const user = userEvent.setup();

  render(<NewEntryForm createBlogEntry={mockCreateBlogEntry} />);

  /**
   * Select the form fields
   */
  // const authorInput = screen.getByDisplayValue("blogAuthor");
  // const authorInput = screen.getByRole("input", { name: "blogAuthor" });
  const authorInput = screen.getByTestId("blogAuthor");
  const titleInput = screen.getByTestId("blogTitle");
  const urlInput = screen.getByTestId("blogUrl");
  const button = screen.getByTestId("sendButton");

  await user.type(authorInput, "gandalf");
  await user.type(titleInput, "gondor");
  await user.type(urlInput, "gondor.com");

  await user.click(button);
  expect(mockCreateBlogEntry).toHaveBeenCalledTimes(1);
  expect(mockCreateBlogEntry.mock.calls[0][0]).toBe("gondor");
});
