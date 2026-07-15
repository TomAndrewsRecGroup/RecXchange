import { NextResponse } from 'next/server';
import { getRoles } from '@/lib/roles/fetch';

export const revalidate = 300;

export async function GET() {
  const result = await getRoles();
  return NextResponse.json(result);
}
