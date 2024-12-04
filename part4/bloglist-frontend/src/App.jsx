import { useEffect, useState } from "react";
import services from "./services/requests";
// import getAllBlogs from "./services/requests";

function App() {
  const [blogListElements, setBlogListElements] = useState([]);
  const [blogEntry, setBlogEntry] = useState({
    title: "",
    author: "",
    url: "",
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
  }

  function handleBlogTitle(event) {
    const tmp = event.target.value;
    setBlogEntry({
      title: tmp,
      author: blogEntry.author,
      url: blogEntry.url,
    });
  }
  function handleBlogAuthor(event) {
    const tmp = event.target.value;
    setBlogEntry({
      title: blogEntry.title,
      author: tmp,
      url: blogEntry.url,
    });
  }

  function handleBlogUrl(event) {
    const tmp = event.target.value;
    setBlogEntry({
      title: blogEntry.title,
      author: blogEntry.author,
      url: tmp,
    });
  }

  return (
    <>
      <h1>Bloglist</h1>
      <div>
        {/* FORM */}
        <form
          id="addBlog"
          onSubmit={(event) => {
            addNewBlog(event);
          }}
        >
          <div>
            title: <input value={blogEntry.title} onChange={handleBlogTitle} />
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
                {blog.title} - {blog.author} - {blog.likes} -{" "}
                <button>delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
