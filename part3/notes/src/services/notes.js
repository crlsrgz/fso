import axios from "axios";
const BASEURL = "/api/notes";

const getAll = () => {
  const request = axios.get(BASEURL);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(BASEURL, newObject);
  return request.then((response) => response.data);
};

const updateTest = (id, newObject) => {
  return axios
    .put(`${BASEURL}/${id}`, newObject)
    .then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${BASEURL}/${id}`, newObject);
  return request.then((res) => {
    return res.data;
  });
};

export default { getAll, create, update, updateTest };
