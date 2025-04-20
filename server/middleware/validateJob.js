import { check, validationResult } from 'express-validator';

// Middleware for validating job data on creation and update
const validateJob = [
  // Validate the fields
  check('title', 'Job title is required').notEmpty().isLength({ min: 3 }).withMessage('Job title must be at least 3 characters'),
  check('company', 'Company name is required').notEmpty().isLength({ min: 3 }).withMessage('Company name must be at least 3 characters'),
  check('location', 'Job location is required').notEmpty().isLength({ min: 3 }).withMessage('Location must be at least 3 characters'),
  check('status', 'Job status is required')
    .optional()
    .isIn(['Applied', 'Interviewing', 'Offer', 'Hired', 'Rejected'])
    .withMessage('Status must be one of Applied, Interviewing, Offer, Hired, or Rejected'),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);  // Get validation errors from the request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  // Send error response if validation fails
    }
    next();  // Proceed to the next middleware or route handler if validation passes
  }
];

// Export default to use as default import
export default validateJob;
