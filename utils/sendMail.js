import { createTransport } from "nodemailer";

export const sendMail = async (email, subject, message) => {
  const transport = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transport
    .verify()
    .then(console.log("mail send successfuly from sendmail function"))
    .catch((err) => console.log("something is error while sending code ", err));

  await transport
    .sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject,
      text: message,
    })
    .then((msg) => {
      console.log(`suceess msg from sendmail1${msg}`);
    })
    .catch((err) => {
      console.log(`error from sendmail1 ${err}`);
    });
};
