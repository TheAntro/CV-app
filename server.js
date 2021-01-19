const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const db = process.env.DB_CONN;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.port || 5000;

app.get('/', (req, res) => {
  return res.status(200).send('Server running');
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));