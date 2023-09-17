const express = require('express');
const router = express.Router();
let controllerProduct = require('../controllers/controller');
const verifyToken = require('../middlewares/verifyToken');
const userRoles = require('../utilites/userRoles');
const allowedTo = require('../middlewares/allowedTo');

router.get("/", (req, res) => {
    res.send("Welcome");
  });
  
  // get all products
  router.get("/api/products",controllerProduct.showAllProduct);
  
  // get product
  router.get("/api/products/:productId",controllerProduct.showOneProduct );
  
  // create new product
  router.post("/api/products", verifyToken, allowedTo(userRoles.ADMIN, userRoles.OWNER), controllerProduct.addNewProduct );
  
  // update product
  router.patch("/api/products/:productId", verifyToken, allowedTo(userRoles.ADMIN),controllerProduct.updateProduct);
  
  // delete product
  router.delete("/api/products/:productId",verifyToken, allowedTo(userRoles.ADMIN, userRoles.OWNER), controllerProduct.deleteProduct);
  
module.exports=router;