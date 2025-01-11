import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  // User
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [erroMessage, setErrorMessage] = useState(null);

  // Blog Entry
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  useEffect(() => {
    const getLoggedUser = window.localStorage.getItem('userLogged');
    if (getLoggedUser) {
      const user = JSON.parse(getLoggerUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
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

        {newEntryForm()}
      </>
    );
  };

  const handlePostNewEntry = async (event) => {
    event.preventDefault();
    const newEntry = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };
    blogService.postEntry(newEntry);
    setBlogs(blogs.concat(newEntry));
    // console.log(blogTitle, blogAuthor, blogUrl);
  };
  const newEntryForm = () => {
    return (
      <>
        <h3>Create new</h3>
        <form onSubmit={handlePostNewEntry}>
          <div>
            title:
            <input
              type='text'
              value={blogTitle}
              name='blogTitle'
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type='text'
              value={blogAuthor}
              name='blogAuthor'
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type='text'
              value={blogUrl}
              name='blogUrl'
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </div>
          <button type='submit'>Add new</button>
        </form>
      </>
    );
  };

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  function handleLogout(event) {
    event.preventDefault();
    window.localStorage.removeItem('userLogged');
    setUser(null);
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {!user ? loginForm() : logoutForm()}
      <h3>blogs list</h3>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
