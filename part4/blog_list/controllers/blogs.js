const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/blogs', async (request, response, next) => {
	try {
		const blogs = await Blog.find({});
		response.json(blogs);
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.post('/blogs', async (request, response, next) => {
	// Default likes to 0 if they arent included
	const blogBody = request.body;
	if (blogBody.likes === undefined) {
		blogBody.likes = 0;
	}

	const blog = new Blog(blogBody);

	try {
		const result = await blog.save();
		response.status(201).json(result);
	} catch (exception) {
		next(exception);
	}
});

module.exports = blogsRouter;
