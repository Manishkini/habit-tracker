const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  start_date: {
    type: Date,
    default: Date.now,
  },
  habit_details: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HabitDetails',
    },
  ],
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
