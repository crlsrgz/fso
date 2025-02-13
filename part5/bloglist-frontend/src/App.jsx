import { useState, useEffect } from "react";
import "./app.css";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import NewEntryForm from "./components/NewEntryForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [blogMessage, setBlogMessage] = useState(null);
  const [messageClasses, setBlogMessageClasses] = useState("");

  // User
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [erroMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getLoggedUser = window.localStorage.getItem("userLogged");
    if (getLoggedUser) {
      const user = JSON.parse(getLoggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input
            data-testid='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            data-testid='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'> login </button>
        <br />
      </form>
    );
  };

  const logoutForm = () => {
    return (
      <>
        <div>{`logged in as ${user.username}`}</div>
        <form onSubmit={handleLogout}>
          <button type='submit'>logout</button>
        </form>
        <Togglable buttonLabel={"Add new Blog"}>
          <NewEntryForm createBlogEntry={handlePostNewEntry} />
        </Togglable>
      </>
    );
  };

  const handlePostNewEntry = async (blogEntryObject) => {
    const postEntry = await blogService.postEntry(blogEntryObject);

    setBlogs(blogs.concat(postEntry.data));
    setBlogMessageClasses("accepted");

    setTimeout(() => {
      setBlogMessage(null);
    }, 5000);
  };

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogService.setToken(user.token);
      //TODO NOW
      window.localStorage.setItem("userLogged", JSON.stringify(user));
      setUser(user);

      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");

      setBlogMessage("wrong username or password");
      setBlogMessageClasses("error");

      setTimeout(() => {
        setErrorMessage(null);
        setBlogMessage(null);
      }, 5000);
    }
  }

  function handleLogout(event) {
    event.preventDefault();
    window.localStorage.removeItem("userLogged");
    setUser(null);
  }
  /**
   * Sets the blog using a new filtered array excluding the item with the deleted id
   * the functions is called from the child component.
   * @param {string} itemId
   */
  function handleDeleteItemfromArray(itemId) {
    setBlogs((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);

      setBlogs(blogs);
    });
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {blogMessage ? <h3 className={messageClasses}>{blogMessage}</h3> : ""}

      {!user ? loginForm() : logoutForm()}
      <h3>blogs list</h3>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onDelete={handleDeleteItemfromArray} />
      ))}
    </div>
  );
};

export default App;
