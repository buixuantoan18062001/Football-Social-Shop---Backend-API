const Product = require("../models/Product");

exports.getProducts = async (query) => {
 const {
  search,
  minPrice,
  maxPrice,
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "desc"
 } = query;

 const filter = {};

 if (search) {
  filter.name = { $regex: search, $options: "i" };
 }

 if (minPrice || maxPrice) {
  filter.price = {};
  if (minPrice) filter.price.$gte = minPrice;
  if (maxPrice) filter.price.$lte = maxPrice;
 }

 const skip = (page - 1) * limit;

 const products = await Product.find(filter)
  .sort({ [sort]: order === "asc" ? 1 : -1 })
  .skip(skip)
  .limit(limit);

 const total = await Product.countDocuments(filter);

 return { products, total, page, limit };
};


// ✅ GET PRODUCT BY ID
exports.getProductById = async (id) => {

  const product = await Product
    .findById(id)
    .populate("ratings.user", "name email");

  if (!product) return null;

  // tăng view khi xem product
  product.views += 1;

  await product.save();

  return product;
};


// ✅ CREATE
exports.createProduct = async (data) => {
 return await Product.create(data);
};


// ✅ UPDATE
exports.updateProduct = async (id, data) => {
 return await Product.findByIdAndUpdate(id, data, { new: true });
};


// ✅ DELETE
exports.deleteProduct = async (id) => {
 return await Product.findByIdAndDelete(id);
};