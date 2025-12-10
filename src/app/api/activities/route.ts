import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    seedDatabase();

    const activities = db.prepare(`
      SELECT
        a.*,
        c.first_name || ' ' || c.last_name as contact_name,
        d.title as deal_title
      FROM activities a
      LEFT JOIN contacts c ON a.contact_id = c.id
      LEFT JOIN deals d ON a.deal_id = d.id
      ORDER BY a.due_date ASC
    `).all();

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, title, description, contact_id, deal_id, due_date, priority } = body;

    const result = db.prepare(`
      INSERT INTO activities (type, title, description, contact_id, deal_id, due_date, priority)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(type, title, description, contact_id, deal_id, due_date, priority || 'medium');

    return NextResponse.json({ id: result.lastInsertRowid, ...body });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, completed } = body;

    db.prepare(`
      UPDATE activities SET completed = ? WHERE id = ?
    `).run(completed ? 1 : 0, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating activity:', error);
    return NextResponse.json({ error: 'Failed to update activity' }, { status: 500 });
  }
}
