import Job from '../models/jobModel.js';  // Import the Job model

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();  // Fetch all jobs from the database
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get a job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);  // Fetch a job by ID
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Create a new job
export const createJob = async (req, res) => {
  const { title, company, location, status } = req.body;

  try {
    const newJob = new Job({
      title,
      company,
      location,
      status,
    });

    await newJob.save();  // Save the new job to the database
    res.json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Update a job by ID
export const updateJob = async (req, res) => {
  const { title, company, location, status } = req.body;

  try {
    let job = await Job.findById(req.params.id);  // Find the job by ID
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Update the job details
    job.title = title || job.title;
    job.company = company || job.company;
    job.location = location || job.location;
    job.status = status || job.status;

    await job.save();  // Save the updated job
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Delete a job by ID
export const deleteJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);  // Find the job by ID
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    await job.remove();  // Remove the job from the database
    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
