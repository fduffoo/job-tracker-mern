import mongoose from 'mongoose';

// Define the Job schema
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    minlength: [3, 'Job title must be at least 3 characters']
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  company: {
    type: String,
    required: [true, 'Company name is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  status: {
    type: String,
    enum: ['Applied', 'Interviewing', 'Offer', 'Hired', 'Rejected'],
    default: 'Applied'
  }
});

// Create and export the Job model
const Job = mongoose.model('Job', jobSchema);
export default Job;
