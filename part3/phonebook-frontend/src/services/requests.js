import axios from "axios";
const BASEURL = "/api/persons";

async function getAllReq() {
  const request = axios.get(BASEURL);
  return request.then((response) => response.data);
}

const createEntryReq = (newEntry) => {
  const request = axios.post(BASEURL, newEntry);
  return request.then((response) => response.data).catch((error) => error);
};

// const modifyEntryReq = (newEntry) => {
//   const request = axios.put(BASEURL, newEntry);
//   return request.then((response) => response.data);
// };

async function modifyEntryReq(newEntry) {
  const request = axios.put(`${BASEURL}/${newEntry.id}`, newEntry);

  return request.then((response) => response.data).catch((error) => error);
}

const deleteEntryReq = (id) => {
  const request = axios.delete(`${BASEURL}/${id}`);

  return request.then((response) => {
    response.data;
  });
};

export default { getAllReq, createEntryReq, modifyEntryReq, deleteEntryReq };
