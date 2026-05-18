import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = new Stripe(stripeSecret, { apiVersion: '2024-11-15' });

export async function POST(req: Request) {
  if (!stripeSecret) {
    return NextResponse.json({ error: 'Stripe secret key not configured' }, { status: 500 });
  }

  try {
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Basic example: client can request a plan via JSON body, default to Java Pro
    const body = await req.json().catch(() => ({}));
    const plan = body.plan || 'java';

    let priceData: { currency: string; unit_amount: number; product_data: { name: string } };

    if (plan === 'python') {
      priceData = { currency: 'usd', unit_amount: 4999, product_data: { name: 'Python Pro' } };
    } else if (plan === 'js') {
      priceData = { currency: 'usd', unit_amount: 3999, product_data: { name: 'JavaScript Pro' } };
    } else {
      priceData = { currency: 'usd', unit_amount: 5999, product_data: { name: 'Java Pro' } };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price_data: priceData, quantity: 1 }],
      success_url: `${origin}/subscribe?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/subscribe?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
