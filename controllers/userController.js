const User = require('../models/userModels');
const bcrypt = require('bcrypt');

module.exports.getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(400).json({ msg: 'No Users Found' });
  }
  return res.status(200).json({ users });
};

module.exports.signup = async (req, res, next) => {
  const { email, name, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(200).json({ msg: 'User Already Exist' });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });
  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ msg: 'Please Signup Yourself!!!!' });
  }
  const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);
  if (!isCorrectPassword) {
    return res.status(400).json({ msg: "Password Doesn't Match" });
  }
  return res
    .status(200)
    .json({ msg: 'Successfully Loggedin', user: existingUser });
};
