// ================================================================
//  Punchline — Local Dev Server
//  Serves static HTML files AND creates Stripe PaymentIntents
// ================================================================

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve all HTML/CSS/JS files from this folder
app.use(express.static(path.join(__dirname)));

// ----------------------------------------------------------------
//  POST Test 2
// ----------------------------------------------------------------
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', description = 'Punchline Plan' } = req.body;

    if (!amount || amount < 50) {
      return res.status(400).json({ error: 'Amount must be at least 50 cents.' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,        // in cents — e.g. $12.00 = 1200
      currency,
      description,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n✅  Punchline dev server running at http://localhost:${PORT}`);
  console.log(`    Stripe mode: ${process.env.STRIPE_SECRET_KEY?.startsWith('sk_test') ? 'TEST' : 'LIVE'}\n`);
});