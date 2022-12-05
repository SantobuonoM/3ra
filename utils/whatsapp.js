import twilio from "twilio";
import config from "../config.cjs";

const accountSid = config.twilio.accountSid;
const authToken = config.twilio.authToken;
const contacto = config.twilio.administratorPhone;
const twilioAPI = twilio(accountSid, authToken);

export function mensajeRegistro() {
  twilioAPI.messages
    .create({
      from: "whatsapp:+14155238886",
      body: "Un usuario fue registrado!",
      to: "whatsapp:+5491123886097",
    })
    .then((message) => console.log(message.sid));
}
export function mensajeProducto(){
  twilioAPI.messages
    .create({
      from: "whatsapp:+14155238886",
      body: "Se acaba de realizar un pedido!",
      to: "whatsapp:+5491123886097",
    })
    .then((message) => console.log(message.sid));
}
