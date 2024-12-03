import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [blogListElements, setBlogListElements] = useState([]);

  // REQUESTS
  async function getAllReq() {
    const request = axios.get("http://localhost:3003/api/blogs");
    return request.then((response) => response.data);
  }

  useEffect(() => {
    getAllReq().then((response) => {
      setBlogListElements(response);
    });
  }, []);

  // FORM Fuctionality
  function addNewBlog(event) {
    event.preventDefault();
    console.log(event);
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
          title: <input />
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
