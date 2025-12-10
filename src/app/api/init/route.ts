import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    seedDatabase();
    return NextResponse.json({ success: true, message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json({ success: false, error: 'Failed to initialize database' }, { status: 500 });
  }
}
