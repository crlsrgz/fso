import { useEffect, useState } from "react";
import services from "./services/requests";
import Title from "./components/Title.components";
import {
  handleBlogAuthor,
  handleBlogTitle,
  handleBlogUrl,
} from "./functions/buttonActions";
import NewEntryForm from "./components/NewEntryForm.component";
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
    console.log("effect - display list");
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

    setBlogEntry({
      title: "",
      author: "",
      url: "",
      likes: 0,
    });
  }

  function deleteBlogEntry(event) {
    console.log(event.target.dataset.buttonId);
    blogRequests.deleteBlogEntry(event.target.dataset.buttonId);
    blogRequests.getAll().then((response) => setBlogListElements(response));
    setBlogEntry({
      title: "",
      author: "",
      url: "",
      likes: 0,
    });
  }

  function likeBlogEntry(event) {
    blogRequests
      .getBlogEntry(event.target.dataset.buttonId)
      .then((response) => {
        console.log(response.likes);

        const tmp = response.likes + 1;

        console.log(tmp);
        // PUT
        setBlogEntry({
          title: blogEntry.title,
          author: blogEntry.author,
          url: blogEntry.url,
          likes: tmp,
        });
      });
    // setBlogEntry({
    //   title: "",
    //   author: "",
    //   url: "",
    //   likes: 0,
    // });
  }

  return (
    <>
      <Title title={"blog list"} />
      <div>
        <NewEntryForm
          addNewBlog={addNewBlog}
          blogEntry={blogEntry}
          setBlogEntry={setBlogEntry}
          handleBlogTitle={handleBlogTitle}
          handleBlogAuthor={handleBlogAuthor}
          handleBlogUrl={handleBlogUrl}
        />
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
