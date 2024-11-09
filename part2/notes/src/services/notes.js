import axios from "axios";
const BASEURL = "http://localhost:3001/notes";

const getAll = () => {
  return axios.get(BASEURL);
};

const create = (newObject) => {
  return axios.post(BASEURL, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${BASEURL}/${id}`, newObject);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
};
