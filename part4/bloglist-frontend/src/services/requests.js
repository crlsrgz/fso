import axios from "axios";
const BASEURl = "/api/blogs";

class BlogRequest {
  async getAll() {
    console.log("getting all");
    try {
      const request = await axios.get(BASEURl);
      return request.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getBlogEntry(id) {
    const request = axios.get(`${BASEURl}/${id}`);
    return request.then((res) => res.data);
  }

  async submitNewBlog(postBody) {
    const request = axios.post(BASEURl, postBody);
    return request.then((response) => response.data).catch((error) => error);
  }

  async deleteBlogEntry(id) {
    axios
      .delete(`${BASEURl}/${id}`)
      .then((response) => console.log("deleted", response));
  }
}

export default { BlogRequest };
