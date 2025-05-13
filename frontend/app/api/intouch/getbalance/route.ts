import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  try {
    const response = await fetch(
      'https://www.intouchpay.co.rw/api/getbalance',
      {
        method: 'POST',
        body: JSON.stringify({
          username: 'testa',
          timestamp: '20161231115242',
          password:
            '71c931d4966984a90cee2bcc2953ce432899122b0f16778e5f4845d5ea18f7e6',
        }),
        headers: {
          Authorization: `Bearer ${process.env.INTOUCH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching balance:', error)
    return NextResponse.json(
      { error: 'Failed to fetch balance' },
      { status: 500 }
    );
  }
}
