const { 
  addVegItemService, addNonvegItemService, addMilkItemService,
  addMultipleVegItemsService, addMultipleNonvegItemsService, addMultipleMilkItemsService,
  getVegItemsService, getNonvegItemsService, getMilkItemsService,
  fetchAllOrders, saveOrderService, registerUserService, loginUserService
} = require("./ProductService");

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const addVegItem = async (req, res) => { try { const result = await addVegItemService(req.body); res.status(201).send({ message: "Veg item added successfully", item: result }); } catch (err) { res.status(500).send({ message: "Failed to add veg item", error: err.message }); } };
const addNonvegItem = async (req, res) => { try { const result = await addNonvegItemService(req.body); res.status(201).send({ message: "Non-veg item added successfully", item: result }); } catch (err) { res.status(500).send({ message: "Failed to add non-veg item", error: err.message }); } };
const addMilkItem = async (req, res) => { try { const result = await addMilkItemService(req.body); res.status(201).send({ message: "Milk item added successfully", item: result }); } catch (err) { res.status(500).send({ message: "Failed to add milk item", error: err.message }); } };

const addMultipleVegItems = async (req, res) => { try { const result = await addMultipleVegItemsService(req.body); res.status(201).send({ message: "Multiple veg items added successfully", items: result }); } catch (err) { res.status(500).send({ message: "Error adding multiple veg items", error: err.message }); } };
const addMultipleNonvegItems = async (req, res) => { try { const result = await addMultipleNonvegItemsService(req.body); res.status(201).send({ message: "Multiple non-veg items added successfully", items: result }); } catch (err) { res.status(500).send({ message: "Error adding multiple non-veg items", error: err.message }); } };
const addMultipleMilkItems = async (req, res) => { try { const result = await addMultipleMilkItemsService(req.body); res.status(201).send({ message: "Multiple milk items added successfully", items: result }); } catch (err) { res.status(500).send({ message: "Error adding multiple milk items", error: err.message }); } };

const getVegItems = async (req, res) => { try { const items = await getVegItemsService(); res.send({ items }); } catch (err) { res.status(500).send({ message: "Failed to fetch veg items", error: err.message }); } };
const getNonvegItems = async (req, res) => { try { const items = await getNonvegItemsService(); res.send({ items }); } catch (err) { res.status(500).send({ message: "Failed to fetch non-veg items", error: err.message }); } };
const getMilkItems = async (req, res) => { try { const items = await getMilkItemsService(); res.send({ items }); } catch (err) { res.status(500).send({ message: "Failed to fetch milk items", error: err.message }); } };

const getAllOrders = async (req, res) => { try { const orders = await fetchAllOrders(); res.status(200).json({ message: "Orders fetched successfully", data: orders }); } catch (err) { res.status(500).json({ message: "Failed to fetch orders", error: err.message }); } };

const placeOrder = async (req, res) => {
  try {
    const { items, total, discount, finalAmount, date, customerEmail } = req.body;
    const newOrder = await saveOrderService({ items, total, discount, finalAmount, date, customerEmail });
    
    // Send Email
    if (customerEmail) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      });

      let orderText = items.map(i => `${i.name} x${i.quantity} = ₹${i.price*i.quantity}`).join("\n");

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: "Your Order Details",
        text: `Thank you for your order!\n\nItems:\n${orderText}\n\nTotal: ₹${finalAmount}\nDiscount: ${discount}\nDate: ${date}`
      });
    }

    res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const registerUser = async (req, res) => { try { const result = await registerUserService(req.body);
res.status(201).send({ message: "User registered successfully", user: result }); 
} catch (err) { res.status(500).send(err); } };

const loginUser = async (req, res) => {
  try {
    const result = await loginUserService(req.body); 

    if (!result)
      return res.status(400).send({ message: "Invalid Email or Password" });

    res.status(200).send({
      message: "Login Successful",
      token: result.token,
      user: result.user
    });
  } catch (err) {
    res.status(500).send(err);
  }
};


module.exports = {
  addVegItem, addNonvegItem, addMilkItem,
  addMultipleVegItems, addMultipleNonvegItems, addMultipleMilkItems,
  getVegItems, getNonvegItems, getMilkItems,
  getAllOrders, placeOrder, registerUser, loginUser
};
