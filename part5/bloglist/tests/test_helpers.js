const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        // likes: 12,
        __v: 0,
    },
];
const newBlogEntry = {
    title: "New blog entry",
    author: "John Doe",
    url: "http://www.newblog.somepage",
    likes: 5, // missing will default to 0
};

const newBlogEntryMissingLikes = {
    title: "Missing Likes",
    author: "John Doe",
    url: "http://www.missinglikes.somepage",
};

const newBlogEntryMissingTitle = {
    author: "John Doe",
    url: "http://www.missinglikes.somepage",
};
const newBlogEntryMissingUrl = {
    author: "John Doe",
    url: "http://www.missinglikes.somepage",
};

/*:: Functions */
const BlogEntry = require("../models/blogEntry");

const blogEntriesInDb = async () => {
    const blogEntries = await BlogEntry.find({});
    return blogEntries.map((entry) => entry.toJSON());
};

const newUser = {
    username: "legolas",
    name: "Legolas",
    password: "ethelum",
};

const newInvalidUser = {
    name: "Gimli",
    password: "edro",
};

module.exports = {
    blogs,
    newBlogEntry,
    newBlogEntryMissingLikes,
    newBlogEntryMissingTitle,
    newBlogEntryMissingUrl,
    blogEntriesInDb,
    newUser,
    newInvalidUser,
};
