import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export async function mailRegistros(user) {
  const EMAIL_ACCOUNT = process.env.EMAIL;
  const EMAIL_PASSWORD = process.env.PASSWORD;

  const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: EMAIL_ACCOUNT,
      pass: EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "NodeJS app <noreply@example.com>",
    to: "matiasantobuono@gmail.com",
    subject: "Registro finalizado con exito! ",
    text: `Acaba de registrarse con el usuario: ${user}`,

  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
}
export async function mailProducto(prod) {
  const EMAIL_ACCOUNT = process.env.EMAIL;
  const EMAIL_PASSWORD = process.env.PASSWORD;

  const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: EMAIL_ACCOUNT,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "NodeJS app <noreply@example.com>",
    to: "matiasantobuono@gmail.com",
    subject: "Acaba de realizar una compra! ",
    text: `Se ha registrado una compra suya en nuestra base de datos.
    Producto ID: ${prod}`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
}
