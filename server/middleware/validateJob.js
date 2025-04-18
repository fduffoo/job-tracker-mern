import { check, validationResult } from 'express-validator';

// Middleware for validating job data on creation and update
const validateJob = [
  // Validate the fields
  check('title', 'Job title is required').notEmpty(),
  check('company', 'Company name is required').notEmpty(),
  check('location', 'Job location is required').notEmpty(),
  check('status', 'Job status is required').isIn(['Applied', 'Interviewing', 'Offer', 'Hired', 'Rejected']).optional(),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);  // Get validation errors from the request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  // Send error response if validation fails
    }
    next();  // Proceed to the next middleware or route handler if validation passes
  }
];

export default validateJob;
