const express = require("express");
// const verifyToken = require("./verifyToken");
const { 
  addVegItem, addNonvegItem, addMilkItem,
  addMultipleVegItems, addMultipleNonvegItems, addMultipleMilkItems,
  getVegItems, getNonvegItems, getMilkItems,
  getAllOrders, placeOrder, registerUser, loginUser
} = require("./ProductController");
// const auth = require("./auth");
const router = express.Router();

// Products
router.post("/addVegItem", addVegItem);
router.post("/addNonvegItem", addNonvegItem);
router.post("/addMilkItem", addMilkItem);

router.post("/addMultipleVegItems", addMultipleVegItems);
router.post("/addMultipleNonvegItems", addMultipleNonvegItems);
router.post("/addMultipleMilkItems", addMultipleMilkItems);

router.get("/getVegItems", getVegItems);
router.get("/getNonvegItems", getNonvegItems);
router.get("/getMilkItems", getMilkItems);

// Orders
router.get("/orders", getAllOrders);
router.post("/placeOrders", placeOrder);

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
