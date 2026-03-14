require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3005;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/librarydb';

app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    const allowed = !origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    callback(null, allowed);
  }
}));

app.use(logger);
app.use(routes);
app.use(notFound);
app.use(errorHandler);

mongoose.connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, '127.0.0.1', () => {
      console.log(`Server started at http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
