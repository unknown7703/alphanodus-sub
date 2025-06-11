// backend/routes/jobs.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');

// Configure Multer for PDF resume uploads (BONUS)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// Get all open job listings
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs ORDER BY posting_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single job listing
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Job not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Apply for a job
router.post('/:id/apply', upload.single('resume'), async (req, res) => {
  const jobId = req.params.id;
  const { fullName, email, phoneNumber, coverLetter } = req.body;
  const resumePath = req.file ? req.file.path : null;

  // Basic validation
  if (!fullName || !email || !phoneNumber) {
    return res.status(400).json({ message: 'Contact information is required.' });
  }

  try {
    // Check if job has more than 5 total applications
    const appCount = await db.query('SELECT COUNT(*) FROM applications WHERE job_id = $1', [jobId]);
    if (parseInt(appCount.rows[0].count) >= 5) {
      return res.status(403).json({ message: 'This job is no longer accepting applications.' });
    }
    
    // (BONUS) Check if candidate applied for > 5 jobs in 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const userAppCount = await db.query(
      "SELECT COUNT(*) FROM applications WHERE email = $1 AND applied_at > $2 AND status != 'rejected'",
      [email, twentyFourHoursAgo]
    );

    if (parseInt(userAppCount.rows[0].count) >= 5) {
      return res.status(403).json({ message: 'You have exceeded the application limit for the past 24 hours.' });
    }

    // Insert application
    const result = await db.query(
      'INSERT INTO applications (job_id, full_name, email, phone_number, resume_path, cover_letter) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [jobId, fullName, email, phoneNumber, resumePath, coverLetter]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') { // unique_violation for (job_id, email)
      return res.status(409).json({ message: 'You have already applied for this job.' });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
