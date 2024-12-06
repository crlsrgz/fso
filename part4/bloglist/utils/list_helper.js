/**
 *
 * @param {Array} blogs
 * @returns {Number}
 */
const dummy = (blogs) => {
  if (blogs) {
    return 1;
  } else {
    return 0;
  }
};

const totalLikes = (array) => {
  const total = array.reduce((acc, x) => {
    // console.log("===>", x.likes);
    return acc + x.likes;
  }, 0);
  return total;
};

module.exports = { dummy, totalLikes };
