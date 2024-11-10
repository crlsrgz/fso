import axios from "axios";
const BASEURL = "http://localhost:3001/persons";
async function getAll() {
  //   axios.get(BASEURL).then((response) => {
  //     console.log("service", response.data);
  //   });
  const request = axios.get(BASEURL);
  return request.then((response) => response.data);
}

const create = (newEntry) => {
  const request = axios.post(BASEURL, newEntry);
  return request.then((response) => response.data);
};

export default { getAll, create };
