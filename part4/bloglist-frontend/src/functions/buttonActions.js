/**
 *
 * @param {*} event
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

export { handleBlogTitle };
