import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch('https://www.intouchpay.co.rw/api/requestdeposit/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log('Withdraw response:', data);

    if (!response.ok) {
      return NextResponse.json({ message: data?.message || 'Withdraw failed' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Withdraw proxy error:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
