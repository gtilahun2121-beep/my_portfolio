const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const Visitor = require('../models/Visitor');

// Get analytics data (admin only)
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    // Get counts
    const [totalProjects, totalBlogs, totalMessages, totalVisitors] = await Promise.all([
      Project.countDocuments(),
      Blog.countDocuments({ published: true }),
      Contact.countDocuments(),
      Visitor.countDocuments()
    ]);

    // Get visitors in date range
    const visitorsInRange = await Visitor.countDocuments({
      createdAt: { $gte: startDate }
    });

    // Get unread messages
    const unreadMessages = await Contact.countDocuments({ read: false });

    // Get messages in date range
    const messagesInRange = await Contact.countDocuments({
      createdAt: { $gte: startDate }
    });

    // Get top blogs by views
    const topBlogs = await Blog.find({ published: true })
      .select('title views')
      .sort({ views: -1 })
      .limit(5);

    // Get top projects by views (if projects have views field)
    const topProjects = await Project.find()
      .select('title views')
      .sort({ views: -1 })
      .limit(5);

    // Get recent visitors
    const recentVisitors = await Visitor.find()
      .sort({ createdAt: -1 })
      .limit(10);

    // Get recent contact messages
    const recentMessages = await Contact.find()
      .select('name email subject message createdAt read')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get page visits breakdown
    const pageVisits = await Visitor.aggregate([
      {
        $group: {
          _id: '$page',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Get daily visitors for last 7 days
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const count = await Visitor.countDocuments({
        createdAt: { $gte: date, $lt: nextDate }
      });
      
      last7Days.push({
        date: date.toISOString().split('T')[0],
        visitors: count
      });
    }

    // Get browser/device stats
    const browserStats = await Visitor.aggregate([
      {
        $group: {
          _id: '$browser',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const deviceStats = await Visitor.aggregate([
      {
        $group: {
          _id: '$device',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      overview: {
        totalProjects,
        totalBlogs,
        totalMessages,
        totalVisitors,
        unreadMessages,
        visitorsInRange,
        messagesInRange
      },
      topBlogs,
      topProjects,
      recentVisitors,
      recentMessages,
      pageVisits,
      last7Days,
      browserStats,
      deviceStats
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark contact message as read
router.put('/messages/:id/read', auth, isAdmin, async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete contact message
router.delete('/messages/:id', auth, isAdmin, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
