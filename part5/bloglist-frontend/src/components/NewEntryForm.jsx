import PropTypes from 'prop-types';
import { useState } from 'react';

const NewEntryForm = ({ createBlogEntry }) => {
  // Blog Entry
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const handlePostNewEntry = (event) => {
    event.preventDefault();

    createBlogEntry({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: 0,
    });

    setBlogTitle('');
    setBlogAuthor('');
    setBlogUrl('');
  };

  return (
    <>
      <h3>Create new -b</h3>
      <form onSubmit={handlePostNewEntry}>
        <div>
          title:
          <input
            key={'blogTitle'}
            type='text'
            value={blogTitle}
            name={'blogTitle'}
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            key={'blogAuthor'}
            type='text'
            value={blogAuthor}
            name='blogAuthor'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            key={'blogUrl'}
            type='text'
            value={blogUrl}
            name='blogUrl'
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type='submit'>Add new</button>
      </form>
    </>
  );
};
NewEntryForm.propTypes = {
  createBlogEntry: PropTypes.func.isRequired,
};
export default NewEntryForm;
