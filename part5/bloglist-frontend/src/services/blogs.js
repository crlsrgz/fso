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

const likeEntry = async (blogEntry) => {
  // console.log(blogEntry);
  const url = `${baseUrl}/${blogEntry.id}`;
  const updatedLikes = blogEntry.likes + 1;
  const updatedEntry = {
    user: blogEntry.user,
    likes: updatedLikes,
    author: blogEntry.author,
    title: blogEntry.title,
    url: blogEntry.url,
  };
  const request = await axios.put(url, updatedEntry);
  // console.log(request.data);
  return request.data;
};

export default { getAll, postEntry, setToken, likeEntry };
