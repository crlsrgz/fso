import axios from "axios";
const BASEURl = "/api/blogs";

class BlogRequest {
  async getAll() {
    try {
      const request = await axios.get(BASEURl);
      return request.data;
    } catch (error) {
      console.log(error);
    }
  }

  async submitNewBlog(postBody) {
    const request = axios.post(BASEURl, postBody);
    return request.then((response) => response.data).catch((error) => error);
  }
}

// async function getAllBlogs() {
//   const request = axios.get(BASEURl);
//   return request.then((response) => response.data);
// }

export default { BlogRequest };
