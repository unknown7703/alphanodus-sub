// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

// Admin login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

// Middleware to protect admin routes
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied.');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};


// Create a new job listing
router.post('/jobs', auth, async (req, res) => {
  const { title, department, location, description } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO jobs (title, department, location, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, department, location, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all applications
router.get('/applications', auth, async (req, res) => {
    try {
        const result = await db.query(
          `SELECT a.id, a.full_name, a.email, j.title as job_title, a.status 
           FROM applications a JOIN jobs j ON a.job_id = j.id`
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update application status (BONUS)
router.put('/applications/:id/status', auth, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // 'accepted' or 'rejected'
    try {
        const result = await db.query(
            'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
