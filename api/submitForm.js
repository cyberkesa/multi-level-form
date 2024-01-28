const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { formData } = req.body;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'designformtest@gmail.com',
          pass: 'jItpyp-sygxec-ribfa8'
        }
      });

      const mailOptions = {
        from: 'designformtest@gmail.com',
        to: 'nasty.moor21@gmail.com',
        subject: 'New Form Submission',
        text: JSON.stringify(formData, null, 2)
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ message: 'Error sending email' });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ message: 'Email sent successfully' });
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
