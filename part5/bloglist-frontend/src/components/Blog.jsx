const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  console.log(blog);
  return (
    <div style={blogStyle}>
      <div>{blog.title}</div>
      <div>{blog.url}</div>
      <div>
        {' '}
        <span>likes: {blog.likes}</span>
        <span>
          <button>like</button>
        </span>{' '}
      </div>
      <div>{blog.author}</div>
    </div>
  );
};

export default Blog;
