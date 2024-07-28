import nodemailer from "nodemailer";
import type { Options as SMTPTransportOptions } from "nodemailer/lib/smtp-transport";

const options = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.GMAIL_ACC,
    pass: process.env.GMAIL_SECRET,
  },
  logger: true,
} satisfies SMTPTransportOptions;

async function main() {
  const transporter = nodemailer.createTransport(options);

  const info = await transporter.sendMail({
    from: "VRG RealHome",
    to: process.env.TEST_EMAIL,
    subject: "Test",
    text: "Hello, world!",
    html: "<strong>Hello, World!</strong>",
    headers: { "x-myheader": "Test Header" },
  });

  if (info.accepted) console.log("Message send: %s", info.response);
  else console.error("rejected");
}
