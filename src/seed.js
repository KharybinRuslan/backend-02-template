require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/user');
const Book = require('./models/book');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/librarydb';

const usersData = [
  { name: 'Ivan', lastName: 'Petrov', username: 'ivan1' },
  { name: 'Anna', lastName: 'Smirnova', username: 'anna5' },
  { name: 'Petr', lastName: 'Sidorov', username: 'petr7' },
];

const booksData = [
  { title: 'Duna', author: 'Gerbert', releaseYear: 1965 },
  { title: 'It', author: 'King', releaseYear: 1986 },
  { title: 'Metro', author: 'Glukhovsky', releaseYear: 2005 },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URL);

    await User.deleteMany({});
    await Book.deleteMany({});

    const users = await User.insertMany(usersData);
    const books = await Book.insertMany(booksData);

    console.log('Seed completed');
    console.log(users.map((u) => u._id.toString()));
    console.log(books.map((b) => b._id.toString()));
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
