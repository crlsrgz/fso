import { useState } from 'react';
import blogService from '../services/blogs';
import Togglable from './Togglable';

/**
 * Component
 *
 * @param {object} obj
 * @param {object} obj.blog
 * @param {Function} obj.onDelete
 * onDelete callback function tells the parent component the id of blogEntry so it can be deleted from the original array of entries which are in the state of the parent component
 */
const Blog = ({ blog, onDelete }) => {
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
      // return request.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteEntry = async (event) => {
    event.preventDefault();
    try {
      const request = await blogService.deleteEntry(blog);
    } catch (error) {
      console.log(error);
    }
    onDelete(blog.id);
  };

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title}</span>
      </div>
      <Togglable buttonLabel={'view'}>
        <div>
          {blog.url}
          <div>
            <span>likes: {updateLikes}</span>
            <span>
              <form onSubmit={handleLikeEntry}>
                <button>like</button>
              </form>
            </span>{' '}
          </div>
          <div>{blog.author}</div>
        </div>
        <form onSubmit={handleDeleteEntry}>
          <button>- remove -</button>
        </form>
      </Togglable>
    </div>
  );
};

export default Blog;
