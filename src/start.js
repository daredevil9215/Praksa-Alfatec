require('dotenv').config();
const mongoose = require('mongoose');

/* Connection to database, see .env for database details */
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open.');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  })

require('./models/Souvenir');
const app = require('./app');

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});