/**
 *
 * @param {function} addNewBlog
 * @param {Object} blogEntry with the structure to create a blog
 * @param {function} setBlogEntry, setter from useState
 * @param {function} handleBlogTitle
 * @param {function} handleBlogAuthor
 * @param {function} handleBlogUrl
 */
export default function NewEntryForm({
  addNewBlog,
  blogEntry,
  setBlogEntry,
  handleBlogTitle,
  handleBlogAuthor,
  handleBlogUrl,
}) {
  return (
    <form
      id="addBlog"
      onSubmit={(event) => {
        addNewBlog(event);
      }}
    >
      <div>
        title:{" "}
        <input
          value={blogEntry.title}
          onChange={(event) => {
            handleBlogTitle(event, blogEntry, setBlogEntry);
          }}
        />
      </div>
      <div>
        author:
        <input
          value={blogEntry.author}
          onChange={(event) => {
            handleBlogAuthor(event, blogEntry, setBlogEntry);
          }}
        />
      </div>
      <div>
        url:
        <input
          value={blogEntry.url}
          onChange={(event) => {
            handleBlogUrl(event, blogEntry, setBlogEntry);
          }}
        />
      </div>
      <button type="submit">Add new</button>
    </form>
  );
}
