const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.patch('/:id', updateUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
