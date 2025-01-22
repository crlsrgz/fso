import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postEntry = async (blogEntry) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.post(baseUrl, blogEntry, config);
};

/**
 * like Entry based on id, this is so far just a PUT request with the whole object
 *
 * - TODO Setup the headers using the token variable in this context/file
 * - set up a new object to send
 * - TODO the sent value updates the backend and the frontend but the displayed state will not update the info in the entry
 *
 * @param {object} blogEntry
 */
const likeEntry = async (blogEntry) => {
  const url = `${baseUrl}/${blogEntry.id}`;
  const updatedLikes = blogEntry.likes + 1;

  const updatedEntry = {
    likes: updatedLikes,
    author: blogEntry.author,
    title: blogEntry.title,
    url: blogEntry.url,
    id: blogEntry.id,
  };

  const request = await axios.put(url, updatedEntry);
  return request.data;
};

/**
 * Delete Entry based on id
 * Setup the headers using the token variable in this context/file
 * send the url with the entry id, and the configuration with the headers
 * @param {object} blogEntry
 */
const deleteEntry = async (blogEntry) => {
  const config = {
    headers: { Authorization: token },
  };
  const updatedEntry = {
    author: blogEntry.author,
    title: blogEntry.title,
    url: blogEntry.url,
    id: blogEntry.id,
  };

  // console.log(blogEntry);
  // console.log(updatedEntry);
  const url = `${baseUrl}/${blogEntry.id}`;
  const request = await axios.delete(url, config);
};

export default { getAll, postEntry, setToken, likeEntry, deleteEntry };
