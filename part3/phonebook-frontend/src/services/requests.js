import axios from "axios";
const BASEURL = "http://localhost:3001/api/persons";

async function getAllReq() {
  const request = axios.get(BASEURL);
  return request.then((response) => response.data);
}

const createEntryReq = (newEntry) => {
  const request = axios.post(BASEURL, newEntry);
  return request.then((response) => response.data);
};

const deleteEntryReq = (id) => {
  const request = axios.delete(`${BASEURL}/${id}`);

  return request.then((response) => {
    response.data;
  });
};

export default { getAllReq, createEntryReq, deleteEntryReq };
