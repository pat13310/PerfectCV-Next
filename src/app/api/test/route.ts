import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Test API fonctionne' });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Test POST fonctionne' });
}
