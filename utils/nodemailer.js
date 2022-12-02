import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export async function main() {
  const EMAIL_ACCOUNT = process.env.EMAIL;
  const EMAIL_PASSWORD = process.env.PASSWORD;

  const transporter = createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: EMAIL_ACCOUNT,
      pass: EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "NodeJs appiola",
    to: "cordell.treutel@ethereal.email",
    subject: "Compra realizada, aguardando confirmacion",
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
}
