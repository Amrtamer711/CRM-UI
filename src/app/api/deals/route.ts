import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    seedDatabase();

    const deals = db.prepare(`
      SELECT
        d.*,
        c.first_name || ' ' || c.last_name as contact_name,
        co.name as company_name
      FROM deals d
      LEFT JOIN contacts c ON d.contact_id = c.id
      LEFT JOIN companies co ON d.company_id = co.id
      ORDER BY d.created_at DESC
    `).all();

    return NextResponse.json(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, value, stage, probability, contact_id, company_id, expected_close, description } = body;

    const result = db.prepare(`
      INSERT INTO deals (title, value, stage, probability, contact_id, company_id, expected_close, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, value, stage || 'lead', probability || 10, contact_id, company_id, expected_close, description);

    return NextResponse.json({ id: result.lastInsertRowid, ...body });
  } catch (error) {
    console.error('Error creating deal:', error);
    return NextResponse.json({ error: 'Failed to create deal' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, value, stage, probability, contact_id, company_id, expected_close, description } = body;

    db.prepare(`
      UPDATE deals
      SET title = ?, value = ?, stage = ?, probability = ?, contact_id = ?, company_id = ?, expected_close = ?, description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(title, value, stage, probability, contact_id, company_id, expected_close, description, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating deal:', error);
    return NextResponse.json({ error: 'Failed to update deal' }, { status: 500 });
  }
}
