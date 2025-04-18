import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobRoutes.js';  // Import the routes for the jobs

dotenv.config();  // Load environment variables from .env file

// Log the Mongo URI and Port for debugging
console.log('Mongo URI:', process.env.MONGO_URI);
console.log('Port:', process.env.PORT);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);  // Prefix all routes in jobRoutes with /api/jobs

// Home route to check if the server is running
app.get('/', (req, res) => {
  res.send('Job Tracker API is running...');
});

// Set up server and connect to MongoDB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)  // No need to pass deprecated options
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);  // Exit the process if MongoDB connection fails
  });
