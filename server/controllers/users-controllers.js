const mongoose = require('mongoose');
const bcrypt = require('bcyptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  const users = await User.find({}, '-password');

  res.json({ users });
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(new HttpError('Signing up failed, please try again', 500));
  }

  if (existingUser) {
    return next(new HttpError('User already exists. Please, login. ', 422));
  }

  let hashedPassword;
  try {
    hashedPassowrd = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError('Could not create user, please try again.', 500));
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    transactions: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError('Signing up failed, please try again', 500));
  }

  let token;
  try {
    jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (error) {
    return next(
      new HttpError('Signing up failed, please try again later.', 500)
    );
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(new HttpError('Logging in failed, please try again', 500));
  }

  if (!existingUser) {
    return next(
      new HttpError('Could not identify user, invalid credentials.', 401)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(
      new HttpError('Could not log you in, please check your credentials.', 401)
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError('Could not log you in, please check your credentials.', 401)
    );
  }

  let token;
  try {
    jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (error) {
    return next(
      new HttpError('Logging in failed, please try again later.', 500)
    );
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
