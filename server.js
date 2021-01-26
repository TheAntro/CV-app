const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const profile = require('./routes/profile');
const education = require('./routes/education');
const experience = require('./routes/experience');

const app = express();

app.get('/', (req, res) => {
  return res.status(200).send('Server running');
})

// Logging middleware for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security headers
app.use(helmet());

// Mount routers
app.use('/api/profile', profile);
app.use('/api/education', education);
app.use('/api/experience', experience);

const PORT = process.env.port || 5000;
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});