const mongoose = require('mongoose');
const Blog = require('../models/blogModels');
const User = require('../models/userModels');

module.exports.getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate('user');
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(400).json({ msg: 'No Blogs Found' });
  }
  return res.status(200).json({ blogs });
};

module.exports.addBlogs = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ msg: 'Unable To Find By This ID' });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: 'err' });
  }
  return res.status(200).json({ blog });
};

module.exports.updateBlogs = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, { title, description });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ msg: 'Unable to Update the Blog' });
  }
  return res.status(201).json({ blog });
};

module.exports.getById = async (req, res, next) => {
  let blog;
  const id = req.params.id;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(400).json({ msg: ' No Blog Found' });
  }
  return res.status(200).json({ blog });
};

module.exports.deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate('user');
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(400).json({ msg: 'Unable to Delete the Blog' });
  }
  return res.status(200).json({ msg: 'Successfully Deleted the Blog' });
};

module.exports.getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate('blogs');
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ msg: 'No Blog found' });
  }
  return res.status(200).json({ user: userBlogs });
};
