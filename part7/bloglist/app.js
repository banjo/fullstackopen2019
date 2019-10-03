const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('Connecting to', config.MONGODB_URL);

mongoose
    .connect(config.MONGODB_URL, { useNewUrlParser: true })
    .then(() => logger.info('Conntected to MongoDB'))
    .catch((error) => logger.error('Error connecting to MongoDB:', error.message));

app.use(bodyParser.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);
app.use(cors());

app.use('/api', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
