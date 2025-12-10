import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    seedDatabase();

    const companies = db.prepare(`
      SELECT
        c.*,
        COUNT(DISTINCT co.id) as contact_count,
        COUNT(DISTINCT d.id) as deal_count,
        COALESCE(SUM(CASE WHEN d.stage != 'lost' THEN d.value ELSE 0 END), 0) as total_deal_value
      FROM companies c
      LEFT JOIN contacts co ON co.company_id = c.id
      LEFT JOIN deals d ON d.company_id = c.id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `).all();

    return NextResponse.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, industry, website, size, revenue, location, logo_color } = body;

    const result = db.prepare(`
      INSERT INTO companies (name, industry, website, size, revenue, location, logo_color)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(name, industry, website, size, revenue, location, logo_color || '#c9a962');

    return NextResponse.json({ id: result.lastInsertRowid, ...body });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
  }
}
