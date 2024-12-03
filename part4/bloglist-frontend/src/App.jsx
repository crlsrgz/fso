import { useEffect, useState } from "react";
import services from "./services/requests";
// import getAllBlogs from "./services/requests";

function App() {
  const [blogListElements, setBlogListElements] = useState([]);

  const blogRequests = new services.BlogRequest();

  useEffect(() => {
    blogRequests.getAll().then((response) => setBlogListElements(response));
  }, []);

  // FORM Fuctionality
  function addNewBlog(event) {
    event.preventDefault();
    console.log(event);
    blogRequests.submitNewBlog({
      title: "Third",
      author: "Jake Doe",
      url: "secondblog.sometld/one/",
      likes: 78,
    });
  }

  return (
    <>
      <h1>Bloglist</h1>
      <div>
        <form
          id="addBlog"
          onSubmit={(event) => {
            addNewBlog(event);
          }}
        >
          <div>
            title: <input />
          </div>
          <div>
            author: <input />
          </div>
          <button type="submit">Add new</button>
        </form>
      </div>
      <div>
        <ul>
          {blogListElements.map((blog) => {
            return (
              <li key={blog.id}>
                {blog.title} - {blog.author} - {blog.likes}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
