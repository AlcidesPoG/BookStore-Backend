const Order = require("./order.model");

const createAOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error in create a Order", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email });
    if (!orders) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error in fetch order", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

module.exports = { createAOrder, getOrderByEmail };
