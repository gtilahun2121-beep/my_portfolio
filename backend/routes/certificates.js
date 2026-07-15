const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const { auth, isAdmin } = require('../middleware/auth');

// Get all certificates (public)
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1, issueDate: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create certificate (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const certificate = new Certificate(req.body);
    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update certificate (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete certificate (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
