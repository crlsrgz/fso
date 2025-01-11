import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log(token);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postEntry = async (blogEntry) => {
  const config = {
    headers: { Authorization: token },
  };

  console.log('service blogEntry', blogEntry, token);
  const request = await axios.post(baseUrl, blogEntry, config);
};

export default { getAll, postEntry, setToken };
