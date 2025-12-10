import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    seedDatabase();

    const contacts = db.prepare(`
      SELECT
        c.*,
        co.name as company_name
      FROM contacts c
      LEFT JOIN companies co ON c.company_id = co.id
      ORDER BY c.created_at DESC
    `).all();

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { first_name, last_name, email, phone, title, company_id, status, avatar_color } = body;

    const result = db.prepare(`
      INSERT INTO contacts (first_name, last_name, email, phone, title, company_id, status, avatar_color)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(first_name, last_name, email, phone, title, company_id, status || 'active', avatar_color || '#c9a962');

    return NextResponse.json({ id: result.lastInsertRowid, ...body });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}
