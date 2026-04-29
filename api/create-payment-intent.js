/**
 * ═══════════════════════════════════════════════════════════════
 * PURE JOY EMPOWERMENT — Stripe Payment Intent Handler
 * Serverless Function (Vercel / Netlify Functions compatible)
 *
 * Deploy path: /api/create-payment-intent
 * Runtime: Node.js 18+
 * ═══════════════════════════════════════════════════════════════
 *
 * SETUP:
 *   1. npm install stripe
 *   2. Set environment variable STRIPE_SECRET_KEY=sk_live_XXXX
 *   3. Deploy to Vercel or Netlify (see README.md)
 */

const Stripe = require('stripe');

// ── Initialise Stripe with your secret key ───────────────────────
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

/**
 * Main handler — creates a Stripe PaymentIntent
 * POST /api/create-payment-intent
 *
 * Request body:
 *   { amount: number (cents), currency: string, frequency: string, type: string, donor: object }
 *
 * Response:
 *   { clientSecret: string }
 */
module.exports = async function handler(req, res) {
  // ── CORS headers (adjust origin in production) ────────────────
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'usd', frequency, type, donor } = req.body;

    // ── Input validation ──────────────────────────────────────────
    if (!amount || typeof amount !== 'number' || amount < 50) {
      return res.status(400).json({ error: 'Invalid amount. Minimum is $0.50 USD.' });
    }
    if (amount > 99999900) {
      return res.status(400).json({ error: 'Amount exceeds maximum allowed.' });
    }

    // ── Build metadata ────────────────────────────────────────────
    const metadata = {
      frequency:   frequency || 'one-time',
      donationType: type || 'general',
      donorName:   donor ? `${donor.firstName} ${donor.lastName}` : 'Anonymous',
      donorEmail:  donor?.email || '',
      source:      'website-donate-page',
    };

    // ── For monthly/annual, create a Subscription instead ─────────
    // (See README for full Subscription implementation)
    // For simplicity this endpoint handles one-time + first month of recurring

    // ── Create PaymentIntent ──────────────────────────────────────
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
      description: `Pure Joy Empowerment Uganda — ${metadata.donationType} donation (${metadata.frequency})`,
      receipt_email: donor?.email || undefined,
      statement_descriptor: 'PUREJOY UGANDA',
      automatic_payment_methods: { enabled: true },
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });

  } catch (err) {
    console.error('[PureJoy API] PaymentIntent error:', err);

    // Return Stripe-specific error messages safely
    if (err.type && err.type.startsWith('Stripe')) {
      return res.status(402).json({ error: err.message });
    }

    return res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
};
