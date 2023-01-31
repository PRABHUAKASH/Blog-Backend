const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: 'Blog', required: true }],
});

module.exports = mongoose.model('User', UserSchema);
