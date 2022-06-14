const mongoose = require('mongoose');

// mongoose.connect('');
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error Connecting To DB'));

db.once('open', () => {
  console.log('Successfully Connected to Database!');
});
