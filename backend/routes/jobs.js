const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');

// pdf upload
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

// job list
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs ORDER BY posting_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// single job page
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
    // check total < 5 per job
    const appCount = await db.query('SELECT COUNT(*) FROM applications WHERE job_id = $1', [jobId]);
    if (parseInt(appCount.rows[0].count) >= 5) {
      return res.status(403).json({ message: 'This job is no longer accepting applications.' });
    }
    
    // check if 5 active jobs of a user and are not rejected status
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const userAppCount = await db.query(
      "SELECT COUNT(*) FROM applications WHERE email = $1 AND applied_at > $2 AND status != 'rejected'",
      [email, twentyFourHoursAgo]
    );

    if (parseInt(userAppCount.rows[0].count) >= 5) {
      return res.status(403).json({ message: 'You have exceeded the application limit for the past 24 hours.' });
    }

    // Insert 
    const result = await db.query(
      'INSERT INTO applications (job_id, full_name, email, phone_number, resume_path, cover_letter) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [jobId, fullName, email, phoneNumber, resumePath, coverLetter]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') { 
      return res.status(409).json({ message: 'You have already applied for this job.' });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
