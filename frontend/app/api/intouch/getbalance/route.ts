import { INTOUCHPAY_PASSWORD, INTOUCHPAY_USERNAME } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  try {
    const response = await fetch(
      'https://www.intouchpay.co.rw/api/getbalance',
      {
        method: 'POST',
        body: JSON.stringify({
          username: INTOUCHPAY_USERNAME,
          timestamp: '20161231115242',
          password: INTOUCHPAY_PASSWORD,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch balance' },
      { status: 500 }
    );
  }
}
