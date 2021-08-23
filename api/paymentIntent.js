const stripeAPI = require('../stripe');

const calculatedOrderAmount = (cartItems) => {
  return (
    cartItems.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0) * 100
  );
};
 
const paymentIntent = async (req, res) => {
  const { cartItems, description, receipt_email, shipping } = req.body;
  let paymentIntent;
  try {
    paymentIntent = await stripeAPI.paymentIntents.create({
      amount: calculatedOrderAmount(cartItems),
      currency: 'usd',
      description,
      payment_method_types: ['card'],
      receipt_email,
      shipping,
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: 'an error occured, unable to create payment intent' });
  }
};

module.exports = paymentIntent;
