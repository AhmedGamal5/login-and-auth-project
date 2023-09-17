const User = require("../model/user.model");
const statusTxt = require("../utilites/statusTxt");
const bcrypt = require("bcryptjs");
const createJwt = require("../utilites/createJwt");

// show all users
let showAllUsers = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 3;
  const page = query.page || 1;
  const next = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(next);
  res.json({ status: statusTxt.success, data: { users } });
};

// add new user
let register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res
      .status(400)
      .json({ status: statusTxt.fail, message: "email is already in use" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const register = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  // create jwt token
  const token = await createJwt({
    email: register.email,
    id: register._id,
    role: register.role,
  });
  register.token = token;
  await register.save();
  res.status(201).json({ status: statusTxt.success, data: { register } });
};

// show user
let showOneUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res
      .status(404)
      .json({ status: statusTxt.fail, message: "user not found" });
  }
  res.json({ status: statusTxt.success, data: { user } });
};

// edit user
let updateUsers = async (req, res) => {
  const userId = req.params.userId; 
  try {
    const updatUser = await User.updateOne(
      { _id: userId },
      { $set: { ...req.body} },  
    );    
    return res
      .status(200)
      .json({ status: statusTxt.success, data:updatUser});     
  } catch (e) {
    return res.status(400).json({ status: statusTxt.error, errorr: e.message });
  }
};

// delete user
let deleteUsers = async (req, res) => {
  const deleteUser = await User.deleteOne({ _id: req.params.userId });

  res.json({
    status: statusTxt.success,
    data: { deleteUser },
    message: "user deleted successfully",
  });
};

// logIn
let login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: statusTxt.fail,
      message: "please enter valid email and password",
    });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({
      status: statusTxt.fail,
      message: "user not found",
    });
  }
  const hashedPassword = await bcrypt.compare(password, user.password);
  if (!hashedPassword) {
    return res.status(404).json({
      status: statusTxt.error,
      message: "something went wrong",
    });
  }
  const token = await createJwt({
    email: user.email,
    id: user._id,
    role: user.role,
  });
  return res.status(200).json({
    status: statusTxt.success,
    data: { token },
    message: "logged in successfully",
  });
};

module.exports = {
  showAllUsers,
  register,
  showOneUser,
  updateUsers,
  deleteUsers,
  login,
};
