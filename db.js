const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/Testpassport';

mongoose.connect(dbURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const passportDB = mongoose.connection;
passportDB.once('open', () => {
  console.log('DB connected :)');
});

passportDB.on('error', (e) => {
  console.error('DB error :(');
  console.error(e);
  process.exit(1);
});

module.exports = { passportDB };
