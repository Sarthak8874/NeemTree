const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    unique:true,
    required: true,
    trim: true,
    lowercase: true,
  },
  MobileNo: {
    type: Number,
    require: true,
  },
  DateofBirth: {
    type: Date,
    require: true,
  },
  WorkExperience: {
    type: String,
    require: true,
    trim: true,
  },
  ResumeTitle: {
    type: String,
    require: true,
    trim: true,
  },
  CurrentLocation: {
    type: String,
    require: true,
    trim: true,
  },
  PostalAddress: {
    type: String,
    require: true,
    trim: true,
  },
  CurrentEmployer: {
    type: String,
    require: true,
    trim: true,
  },
  CurrentDesignation: {
    type: String,
    require: true,
    trim: true,
  },
});

const User = mongoose.model("Users",userSchema);

module.exports = User;``