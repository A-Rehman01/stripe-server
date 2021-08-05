const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });

const createCheckoutSession = require('./api/checkout');
const webhook = require('./api/webHook');

const app = express();
const port = 8080;

// app.use(express.json());
app.use(
  express.json({ verify: (req, res, Buffer) => (req['rawBody'] = Buffer) })
);
app.use(cors({ origin: true }));

app.get('/', (req, res) => res.send('Hello World'));

app.post('/create-checkout-session', createCheckoutSession);
app.post('/webhook', webhook);
app.listen(port, () => console.log('Server Listing on Port', port));

// .env
// SECRET_KEY=sk_test_51JKndNCesDhLVmZCm7nj3ekYLJGhsiySxddHAzJEOCGulsgXtKJnAHKC2akMtHZJPbaxCqtS4BbU6RJgzfT3mPaC00GMrKQ6M0
// WEB_APP_URL=http://localhost:3000
// WEBHOOK_SECRET=whsec_hDAZgTk7H8NaNCDFhMszOXb2ygyULY9W
