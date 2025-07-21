const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-mail', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Received contact form:', req.body);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'narenderkumar48125@gmail.com',
      pass: 'YOUR_APP_PASSWORD' // Replace with your Gmail App Password
    }
  });

  // The message will be sent to this email address
  const mailOptions = {
    from: 'narenderkumar48125@gmail.com',
    to: 'narenderkumar48125@gmail.com', // <-- All contact form messages go here
    subject: `Portfolio Contact from ${name} <${email}>`,
    text: message,
    html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message}</p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 