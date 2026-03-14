const express = require('express');
const {
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} = require('../controllers/books');

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.patch('/:id', updateBookById);
router.delete('/:id', deleteBookById);

module.exports = router;
