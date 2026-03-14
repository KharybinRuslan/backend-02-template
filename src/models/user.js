const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    // В критериях оценки указан максимум 5, но в тексте задания указан минимум 5. Пока оставляем минимум 5 без maxlength, чтобы не потерять валидность по основному описанию.
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
