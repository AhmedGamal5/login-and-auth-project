const jwt = require("jsonwebtoken");
const statusTxt = require("../utilites/statusTxt");
const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ status: statusTxt.fail, message: "token is required" });
  }
  const token = authHeader.split(" ")[1];
  try {
   const currentUser= jwt.verify(token, process.env.JWT_SECRET_KEY);
   req.currentUser= currentUser;
    next();
  } catch (err) {
    res.status(401).json({ status: statusTxt.fail, message: "invalid token" });
  }
};

module.exports = verifyToken;
