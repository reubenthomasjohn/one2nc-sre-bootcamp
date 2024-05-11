// requestValidationMiddleware.js

function validateStudentRequest(req, res, next) {
  if (req.method === "POST") {
    // Check if name and email are provided in the request body
    if (!req.body || !req.body.name || !req.body.email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  }

  if (req.method == "PUT") {
    // Check if name and email are provided in the request body
    if (!req.body || !req.body.email) {
      return res.status(400).json({ error: "Email is required" });
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  }

  // If validation passes, continue to the next middleware
  next();
}

module.exports = validateStudentRequest;
