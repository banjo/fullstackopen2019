const _ = require("lodash");

const dummy = blogs => 1;

const totalLikes = blogs => {
    return blogs
        .map(blog => blog.likes)
        .reduce((previous, current) => {
            return previous + current;
        }, 0);
};

const favoriteBlog = blogs => {
    const likes = blogs.map(blog => blog.likes);
    const highest = Math.max.apply(Math, likes);
    return blogs.find(blog => blog.likes === highest);
};

const mostBlogs = blogs => {
    let nameArray = _.map(blogs, "author"); // get an array with authors
    let mostCommonName = _.countBy(nameArray);

    let winner = Object.keys(mostCommonName).reduce((a, b) =>
        mostCommonName[a] > mostCommonName[b] ? a : b
    );

    return { author: winner, blogs: mostCommonName[winner] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
