const express = require('express');
const router = express.Router();
let userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

// get all users
router.get("/api/users",verifyToken,userController.showAllUsers); 

// register 
router.post("/api/users/register",userController.register);

// show one user
router.get("/api/users/:userId",verifyToken,userController.showOneUser);

//update user
router.patch("/api/users/:userId",verifyToken,userController.updateUsers);

//delete user
router.delete("/api/users/:userId",verifyToken,userController.deleteUsers);

//logIn
router.post("/api/users/login",userController.login);


module.exports=router;