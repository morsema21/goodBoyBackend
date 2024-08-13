const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInquiry = async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "thecertifiedgoodboy@gmail.com",
    subject: `Inquiry from ${name}`,
    text: message,
    html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Inquiry sent successfully");
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Error occurred");
  }
};

module.exports = {
  sendInquiry,
};
