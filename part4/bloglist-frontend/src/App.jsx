import { useEffect, useState } from "react";
import services from "./services/requests";
import Title from "./components/Title.components";
import { handleBlogTitle } from "./functions/buttonActions";
// import getAllBlogs from "./services/requests";

function App() {
  const [blogListElements, setBlogListElements] = useState([]);
  const [blogEntry, setBlogEntry] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

  const blogRequests = new services.BlogRequest();

  useEffect(() => {
    blogRequests.getAll().then((response) => setBlogListElements(response));
  }, []);

  // FORM Fuctionality
  function addNewBlog(event) {
    event.preventDefault();
    console.log("newBlog body", blogEntry);

    // console.log(event.target);

    blogRequests.submitNewBlog({
      title: blogEntry.title,
      author: blogEntry.author,
      url: blogEntry.url,
      likes: 1,
    });

    blogRequests.getAll().then((response) => setBlogListElements(response));
  }

  function deleteBlogEntry(event) {
    console.log(event.target.dataset.buttonId);
    blogRequests.deleteBlogEntry(event.target.dataset.buttonId);
    blogRequests.getAll().then((response) => setBlogListElements(response));
  }

  function likeBlogEntry(event) {
    blogRequests
      .getBlogEntry(event.target.dataset.buttonId)
      .then((response) => {
        console.log(response.likes);

        const tmp = response.likes + 1;

        console.log(tmp);
        setBlogEntry({
          title: blogEntry.title,
          author: blogEntry.author,
          url: blogEntry.url,
          likes: tmp,
        });
      });
  }

  function handleBlogAuthor(event) {
    const tmp = event.target.value;
    setBlogEntry({
      title: blogEntry.title,
      author: tmp,
      url: blogEntry.url,
      likes: blogEntry.likes,
    });
  }

  function handleBlogUrl(event) {
    const tmp = event.target.value;
    setBlogEntry({
      title: blogEntry.title,
      author: blogEntry.author,
      url: tmp,
      likes: blogEntry.likes,
    });
  }

  return (
    <>
      <Title title={"blog list"} />
      <div>
        {/* FORM */}
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
              onChange={(e) => {
                handleBlogTitle(e, blogEntry, setBlogEntry);
              }}
            />
          </div>
          <div>
            author:
            <input value={blogEntry.author} onChange={handleBlogAuthor} />
          </div>
          <div>
            url:
            <input value={blogEntry.url} onChange={handleBlogUrl} />
          </div>
          <button type="submit">Add new</button>
        </form>
      </div>
      <div>
        <ul>
          {blogListElements.map((blog) => {
            return (
              <li key={blog.id}>
                {blog.title} - {blog.author} - {blog.likes} - {blog.url}
                <button onClick={likeBlogEntry} data-button-id={blog.id}>
                  like
                </button>
                <button onClick={deleteBlogEntry} data-button-id={blog.id}>
                  delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
