import express from 'express';
import Job from '../models/jobModel.js'; // Import your Job model
import validateJob from '../middleware/validateJob.js'; // Import validation middleware (default import)

const router = express.Router();

// POST: Create a new job with validation
router.post('/', validateJob, async (req, res) => {
  const { title, description, company, location } = req.body;

  // Create a new job
  const job = new Job({
    title,
    description,
    company,
    location,
  });

  try {
    // Save the job to the database
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();  // Get all jobs from the database
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Get a specific job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);  // Find job by ID
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT: Update a job by ID with validation
router.put('/:id', validateJob, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Update the job
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Delete a job by ID
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await job.remove();  // Removes the job
    res.status(200).json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
