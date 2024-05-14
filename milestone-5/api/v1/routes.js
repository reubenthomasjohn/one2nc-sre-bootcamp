const express = require("express");
const router = express.Router();
const prisma = require("./db");
const logger = require("./logger");

// Import middleware
const validateStudentRequest = require("./middleware/requestValidationMiddleware");
const limiter = require("./middleware/rateLimitingMiddleware");

// Import the sample data
const { alice, reuben, moreData } = require("./helpers/sampleData");

// Register middlewares
router.use(validateStudentRequest);
router.use(limiter);

// Define routes
router.get("/", async (req, res) => {
  res.send("v1 GET API");
});

router.get("/students", async (req, res) => {
  try {
    const allStudents = await prisma.student.findMany();
    logger.info("Fetched all students:", allStudents);
    res.status(200).json(allStudents);
  } catch (error) {
    logger.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    logger.info("Fetching details of student", studentId);
    // Assuming this route is for fetching details of a specific student
    // You can replace this with your actual logic
    res.status(200).json({ msg: `Details of student ${studentId}` });
  } catch (error) {
    logger.error(`Error fetching details of student ${studentId}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/students", async (req, res) => {
  try {
    const newStudent = await prisma.student.create({
      data: {
        name: req.body.name || reuben.name, // Fallback to default name
        email: req.body.email || reuben.email, // Fallback to default email
      },
    });
    logger.info("Created a new student:", newStudent);
    res
      .status(201)
      .json({ msg: `Created a new student with id ${newStudent.id}` });
  } catch (error) {
    logger.error("Error creating student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const { name, email } = req.body;
  try {
    // Update student logic
    logger.info(`Updated student ${studentId}`);
    res.status(200).json({ msg: `Updated student ${studentId}` });
  } catch (error) {
    logger.error(`Error updating student ${studentId}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    // Delete student logic
    logger.info(`Deleted student ${studentId}`);
    res.status(200).json({ msg: `Deleted student ${studentId}` });
  } catch (error) {
    logger.error(`Error deleting student ${studentId}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/students", async (req, res) => {
  try {
    const deleteUsers = await prisma.student.deleteMany({});
    logger.info("Deleted all student records");
    res.status(200).json({ msg: "Deleted all student records" });
  } catch (error) {
    logger.error("Error deleting student students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define a route for health check
router.get("/healthcheck", (req, res) => {
  logger.info("Health check requested");

  // Extract hostname from request headers
  const apiHostname = req.headers.host;
  res.json({ status: "UP", api: apiHostname });
});

module.exports = router;
