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

blogsRouter.delete('/blogs/:id', async (request, response, next) => {
	const id = request.params.id;

	try {
		const result = await Blog.findByIdAndDelete(id);
		response.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

blogsRouter.put('/blogs/:id', async (request, response, next) => {
	const blogBody = request.body;

	const newBlog = {
		likes : blogBody.likes
	};

	try {
		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true });
		response.json(updatedBlog.toJSON());
	} catch (error) {
		next(error);
	}
});

module.exports = blogsRouter;
