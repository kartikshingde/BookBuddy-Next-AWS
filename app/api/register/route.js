// app/api/register/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const userData = await request.json();

  try {
    const res = await fetch('https://8ygt0g3yl7.execute-api.eu-north-1.amazonaws.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ message: data.message || 'Register failed' }, { status: 400 });
    }

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
