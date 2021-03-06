const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
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

/* MIDDLEWARE */
// JSON body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Logging middleware for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set security headers
app.use(helmet());

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Prevent http parameter pollution
app.use(hpp());


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
