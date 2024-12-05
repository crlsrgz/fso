/**
 *
 * @param {MouseEvent} event
 * @param {Object} blogEntry
 * @param {function} setBlogEntry
 */
function handleBlogTitle(event, blogEntry, setBlogEntry) {
  const tmp = event.target.value;
  setBlogEntry({
    title: tmp,
    author: blogEntry.author,
    url: blogEntry.url,
    likes: blogEntry.likes,
  });
}
/**
 *
 * @param {MouseEvent} event
 * @param {Object} blogEntry
 * @param {function} setBlogEntry
 */

function handleBlogAuthor(event, blogEntry, setBlogEntry) {
  const tmp = event.target.value;
  setBlogEntry({
    title: blogEntry.title,
    author: tmp,
    url: blogEntry.url,
    likes: blogEntry.likes,
  });
}
/**
 *
 * @param {MouseEvent} event
 * @param {Object} blogEntry
 * @param {function} setBlogEntry
 */

function handleBlogUrl(event, blogEntry, setBlogEntry) {
  const tmp = event.target.value;
  setBlogEntry({
    title: blogEntry.title,
    author: blogEntry.author,
    url: tmp,
    likes: blogEntry.likes,
  });
}

export { handleBlogTitle, handleBlogAuthor, handleBlogUrl };
