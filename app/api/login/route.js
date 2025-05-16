// app/api/login/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const credentials = await request.json();

  try {
    const res = await fetch('https://8ygt0g3yl7.execute-api.eu-north-1.amazonaws.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ message: data.message || 'Login failed' }, { status: 400 });
    }

    // You may want to set a cookie or JWT here for session (later step)

    return NextResponse.json({ message: 'Login successful' });
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
