import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js'; // Import controller functions
import { validateJobData } from '../middleware/validateJobData.js'; // Import validation middleware

const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', getAllJobs);

// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', getJobById);

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Public
// Using validation middleware for data validation before creating the job
router.post('/', validateJobData, createJob);

// @route   PUT /api/jobs/:id
// @desc    Update job by ID
// @access  Public
// Using validation middleware for data validation before updating the job
router.put('/:id', validateJobData, updateJob);

// @route   DELETE /api/jobs/:id
// @desc    Delete job by ID
// @access  Public
router.delete('/:id', deleteJob);

export default router;
