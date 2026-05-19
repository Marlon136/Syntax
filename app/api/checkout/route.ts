import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    error: 'Deprecated route. Use /payments/create-session on the backend instead.',
  }, { status: 410 });
}
