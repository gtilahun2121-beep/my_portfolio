const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { auth, isAdmin } = require('../middleware/auth');
const { sendContactNotification } = require('../services/emailService');

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();

    // Send email notification (don't wait for it)
    sendContactNotification({
      name,
      email,
      subject,
      message
    }).catch(err => {
      console.error('Failed to send email notification:', err);
      // Don't fail the request if email fails
    });

    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all messages (admin only)
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const { read } = req.query;
    let query = {};

    if (read === 'false') query.read = false;

    const messages = await Contact.find(query).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark message as read (admin only)
router.put('/:id/read', auth, isAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete message (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
