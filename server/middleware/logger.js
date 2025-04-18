// middleware/logger.js
const logger = (req, res, next) => {
    console.log(`${req.method} request made to ${req.url} at ${new Date().toISOString()}`);
    next(); // Pass control to the next middleware or route handler
  };
  
  export default logger;
  