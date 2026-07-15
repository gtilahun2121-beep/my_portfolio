const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const { auth, isAdmin } = require('../middleware/auth');

// Get all education (public)
router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ current: -1, startDate: -1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create education (admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update education (admin only)
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete education (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
