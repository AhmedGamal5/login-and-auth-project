const Product = require("../model/schema.model");
const statusTxt = require("../utilites/statusTxt");

let showAllProduct = async (req, res) => {
    const query = req.query;
    const limit = query.limit || 5;
    const page = query.page || 1;
    const next = (page-1)*limit;
    const products = await Product.find().limit(limit).skip(next);
    res.json({ status: statusTxt.success, data: { products } });
  
};

let showOneProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return res
      .status(404)
      .json({ status: statusTxt.fail, message: "Product not found" });
  }
  res.json({ status: statusTxt.success, data: { product } });
};

let addNewProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json({ status: statusTxt.success, data: { newProduct } });
};

let updateProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const updateProduct = await Product.updateOne(
      { _id: productId },
      { $set: { ...req.body } }
    );
    return res
      .status(200)
      .json({ status: statusTxt.success, data: { updateProduct } });
  } catch (e) {
    return res.status(400).json({ status: statusTxt.error, errorr: e.message });
  }
};

let deleteProduct = async (req, res) => {
  const deleteProduct = await Product.deleteOne({ _id: req.params.productId });
  res.json({
    status: statusTxt.success,
    data: { deleteProduct },
    message: "Product deleted successfully",
  });
};

module.exports = {
  showAllProduct,
  showOneProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
