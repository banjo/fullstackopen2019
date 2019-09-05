const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
	{
		title  : 'Journey',
		author : 'Obi',
		url    : 'www.google.se',
		likes  : 5
	},
	{
		title  : 'Trip',
		author : 'Luke',
		url    : 'www.yahoo.se',
		likes  : 10
	}
];

beforeEach(async () => {
	await Blog.deleteMany({});

	initialBlogs.forEach(async (blog) => {
		let blogObject = new Blog(blog);
		await blogObject.save();
	});
});

test('blog listings are returned as json', async () => {
	await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body.length).toBe(initialBlogs.length);
});

test('find a specific note', async () => {
	const response = await api.get('/api/blogs');

	const contents = response.body.map((r) => r.title);

	expect(contents).toContainEqual('Trip');
});

test('a valid blog can be added', async () => {
	const newBlog = {
		title  : 'Fare',
		author : 'Darth',
		url    : 'www.duckduckgo.se',
		likes  : 20
	};

	await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

	const response = await api.get('/api/blogs');

	const contents = response.body.map((r) => r.title);

	expect(response.body.length).toBe(initialBlogs.length + 1);
	expect(contents).toContainEqual('Fare');
});

test('see that id is used instead of _id', async () => {
	const response = await api.get('/api/blogs');
	expect(response.body[0].id).toBeDefined();
});

afterAll(() => {
	mongoose.connection.close();
});
