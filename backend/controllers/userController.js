import {
  sendVerificationEmail,
  sendWelcomeEmail,
} from '../middlewares/sendingEmailConfig.js';
import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if (emailExists) {
      return res
        .status(400)
        .json({ message: 'User already exists with this email' });
    }

    if (usernameExists) {
      return res.status(400).json({ message: 'username is already taken' });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const hashedPassword = await bcryptjs.hash(password, 10);

    sendVerificationEmail(email, verificationCode);

    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      verificationCode,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ status: true, message: 'User created sucessfully' });
  } catch (error) {
    console.log(error);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    const user = await User.findOne({ verificationCode: code });

    if (!user) {
      return res.status(400).json({ message: 'Code is invalid or is expired' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;

    await user.save();

    const userFullname = user.firstname + ' ' + user.lastname;

    await sendWelcomeEmail(userFullname, user.email);
    return res.status(200).json({ message: 'verified', status: true });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Both feilds are required');
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({ message: 'User doesnt exists' });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect email or passowrd ' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    const loggedUserId = user._id;

    return res
      .status(200)
      .json({ sucess: true, message: 'Login sucessfull', token, loggedUserId });
  } catch (error) {
    console.log(error);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(400).json({ message: 'No user found' });
    }

    // removing sensitive data from user object
    const { password, ...userData } = user.toObject();

    return res.status(200).json(userData);
  } catch (error) {
    console.log(error);
  }
};

export { register, verifyEmail, login, getSingleUser };
