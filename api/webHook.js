const stripeAPI = require('../stripe');

const webhook = (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripeAPI.webhooks.constructEvent(
      req['rawBody'],
      sig,
      process.env.WEBHOOK_SECRET
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send(`WebHook Error ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Event data', session);
  }
};

module.exports = webhook;

// Run this command in command  Prompt
// ./stripe listen --forward-to http://localhost:8080/webhook
// Wehbook for integerarion of notification
