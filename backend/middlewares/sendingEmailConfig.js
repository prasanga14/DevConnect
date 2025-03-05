import { config } from 'dotenv';
config();

import nodemailer from 'nodemailer';
import {
  verificationEmailTemplate,
  welcomeEmailTemplate,
} from '../utils/emailTemplate.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const info = await transporter.sendMail({
      from: '"DevConnect 💻" <prasangaghi@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'OTP verification for DevConnect', // Subject line
      text: 'verify the code with this OTP', // plain text body
      html: verificationEmailTemplate.replace(
        '{verificationCode}',
        verificationCode
      ), // html body
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Email not sent');
  }
};

export const sendWelcomeEmail = async (name, email) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Welcome to DevConnect 👻" <prasangaghi@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Welcome to DevConnect', // Subject line
      text: 'Welcome to the family', // plain text body
      html: welcomeEmailTemplate.replace('{name}', name), // html body
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Email is not sent');
  }
};
