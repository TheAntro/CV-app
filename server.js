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
const profiles = require('./routes/profiles');
const educations = require('./routes/educations');
const experiences = require('./routes/experiences');
const skills = require('./routes/skills');
const references = require('./routes/references');
const users = require('./routes/users');

const app = express();

// Middleware
// JSON bodyparser
app.use(express.json());
// Logging middleware for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Set security headers
app.use(helmet());

app.get('/', (req, res) => {
  return res.status(200).send('Server running');
});

// Mount routers
app.use('/api/profiles', profiles);
app.use('/api/educations', educations);
app.use('/api/experiences', experiences);
app.use('/api/skills', skills);
app.use('/api/references', references);
app.use('/api/users', users);

const PORT = process.env.port || 5000;
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
