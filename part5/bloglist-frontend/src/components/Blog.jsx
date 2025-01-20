import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog }) => {
  const [updateLikes, setUpdateLikes] = useState(blog.likes ?? 0);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikeEntry = async (event) => {
    event.preventDefault();

    setUpdateLikes(updateLikes + 1);
    blog.likes = updateLikes;

    try {
      const request = await blogService.likeEntry(blog);
      return request.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={blogStyle}>
      <div>{blog.title}</div>
      <div>{blog.url}</div>
      <div>
        {' '}
        <span>likes: {updateLikes}</span>
        <span>
          <form onSubmit={handleLikeEntry}>
            <button>like</button>
          </form>
        </span>{' '}
      </div>
      <div>{blog.author}</div>
    </div>
  );
};

export default Blog;
