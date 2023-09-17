const statusTxt = require("../utilites/statusTxt");
module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(
        res.status(401).json({
          status: statusTxt.error,
          message: "your role isn't allowed to be assigned",
        })
      );
    }
    next();
  };
};
