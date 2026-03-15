const mongoose = require('mongoose');
const User = require('../models/user');

function handleCastError(err, message) {
  if (err instanceof mongoose.Error.CastError) {
    const error = new Error(message);
    error.statusCode = 404;
    return error;
  }
  return err;
}

async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(user);
  } catch (err) {
    next(handleCastError(err, 'User not found'));
  }
}

async function updateUserById(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(user);
  } catch (err) {
    next(handleCastError(err, 'User not found'));
  }
}

async function deleteUserById(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(user);
  } catch (err) {
    next(handleCastError(err, 'User not found'));
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
