const mongoose = require('mongoose');
const Book = require('../models/book');

function handleCastError(err, message) {
  if (err instanceof mongoose.Error.CastError) {
    const error = new Error(message);
    error.statusCode = 404;
    return error;
  }
  return err;
}

async function getBooks(req, res, next) {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
}

async function getBookById(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      const error = new Error('Book not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(book);
  } catch (err) {
    next(handleCastError(err, 'Book not found'));
  }
}

async function updateBookById(req, res, next) {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      const error = new Error('Book not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(book);
  } catch (err) {
    next(handleCastError(err, 'Book not found'));
  }
}

async function deleteBookById(req, res, next) {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      const error = new Error('Book not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(book);
  } catch (err) {
    next(handleCastError(err, 'Book not found'));
  }
}

module.exports = {
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
