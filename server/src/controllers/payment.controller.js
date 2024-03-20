import instance from "../payment/index.js";
import crypto from "crypto";

const checkout = async (req, res) => {
  const { amount } = req.body;
  try {
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const data = `${razorpay_order_id}|${razorpay_payment_id}`;

    const calculatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(data)
      .digest("hex");

    const isSignatureValid = calculatedSignature === razorpay_signature;

    if (isSignatureValid) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getKey = (req, res) => {
  try {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { checkout, verifyPayment, getKey };
