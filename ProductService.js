const mongoose = require("mongoose");
const productSchema = require("./Schema");
const User = require("./user.schema");
const orderModel = require("./orders.schema");
const jwt = require("jsonwebtoken");


const VegProductModel = mongoose.model("VegItem", productSchema);
const NonVegProductModel = mongoose.model("NonVegItem", productSchema);
const MilkProductModel = mongoose.model("MilkItem", productSchema);

const addVegItemService = (data) => new VegProductModel(data).save();
const addNonvegItemService = (data) => new NonVegProductModel(data).save();
const addMilkItemService = (data) => new MilkProductModel(data).save();

const addMultipleVegItemsService = (data) => VegProductModel.insertMany(data);
const addMultipleNonvegItemsService = (data) => NonVegProductModel.insertMany(data);
const addMultipleMilkItemsService = (data) => MilkProductModel.insertMany(data);

const getVegItemsService = () => VegProductModel.find();
const getNonvegItemsService = () => NonVegProductModel.find();
const getMilkItemsService = () => MilkProductModel.find();

const fetchAllOrders = () => orderModel.find();

const saveOrderService = (data) => new orderModel(data).save();

const bcrypt = require("bcryptjs");

const registerUserService = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await User.create({
    ...data,
    password: hashedPassword
  });
};


const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );

  return { user, token };
};

module.exports = {
  addVegItemService,
  addNonvegItemService,
  addMilkItemService,
  addMultipleVegItemsService,
  addMultipleNonvegItemsService,
  addMultipleMilkItemsService,
  getVegItemsService,
  getNonvegItemsService,
  getMilkItemsService,
  fetchAllOrders,
  saveOrderService,
  registerUserService,
  loginUserService
};
