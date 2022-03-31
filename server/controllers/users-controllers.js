const mongoose = require('mongoose');
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

  const createdUser = new User({
    name,
    email,
    password,
    transactions: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError('Signing up failed, please try again', 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(new HttpError('Logging in failed, please try again', 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError('Could not identify user, invalid credentials.', 401)
    );
  }

  res.json({
    message: 'logged in',
    user: existingUser.toObject({ getters: true }),
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
