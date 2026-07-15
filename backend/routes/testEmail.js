const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Test email endpoint
router.get('/test-email', async (req, res) => {
  try {
    console.log('Testing email configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      debug: true // Enable debug logs
    });

    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified!');

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'Test Email from Portfolio',
      html: '<h1>Test Email</h1><p>If you receive this, email is working!</p>'
    });

    console.log('✅ Test email sent:', info.messageId);

    res.json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId,
      preview: nodemailer.getTestMessageUrl(info)
    });
  } catch (error) {
    console.error('❌ Email test failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.stack
    });
  }
});

module.exports = router;
