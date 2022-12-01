import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const EMAIL_ACCOUNT = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.PASSWORD;

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: EMAIL_ACCOUNT,
    pass: EMAIL_PASSWORD,
  },
});
const mailOptions = {
  from: "NodeJs appiola",
  to: EMAIL_ACCOUNT,
  subject: "TEST",
};
try {
  const info = await transporter.sendMail(mailOptions);
  console.log(info);
} catch (error) {
  console.log(error);
}
