const mongoose = require('mongoose');

const habitDetailsSchema = new mongoose.Schema({
  habit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'none',
  },
});

const HabitDetails = mongoose.model('HabitDetails', habitDetailsSchema);

module.exports = HabitDetails;
