const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utilites/userRoles");
const userSchema = new mongoose.Schema({
  firstName: {
    type: "string",
    required: true,
  },
  lastName: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
    validate:[validator.isEmail, 'failed must be valid email']
  },
  password: {
    type: "string",
    required: true,
  },
  role: {
    type: "string",
    enum: [userRoles.ADMIN, userRoles.OWNER, userRoles.USER],
    default: userRoles.USER,
  }
});

module.exports = mongoose.model('User',userSchema);
