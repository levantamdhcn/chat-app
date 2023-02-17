import nodemailer from "nodemailer";
import config from "../../config";

const transport = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: config.OUTLOOK.USER,
    pass: config.OUTLOOK.PASSWORD
  },
});

const sendConfirmationEmail = async (name: string, email: string, confirmationCode: string) => {
  try {
    transport.sendMail({
      from: config.OUTLOOK.USER,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:8081/confirm/${confirmationCode}> Click here</a>
          </div>`,
    });
  } catch (error) {
    console.log(error);
  }
};

export { sendConfirmationEmail };