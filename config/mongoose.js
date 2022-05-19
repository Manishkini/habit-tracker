const mongoose = require('mongoose');

// mongoose.connect('');
mongoose.connect('mongodb://localhost:27017/habit-tracker');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error Connecting To DB'));

db.once('open', () => {
  console.log('Successfully Connected to Database!');
});
