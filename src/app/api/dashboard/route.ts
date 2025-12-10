import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    // Ensure database is seeded
    seedDatabase();

    // Get total contacts
    const totalContacts = db.prepare('SELECT COUNT(*) as count FROM contacts').get() as { count: number };

    // Get total companies
    const totalCompanies = db.prepare('SELECT COUNT(*) as count FROM companies').get() as { count: number };

    // Get total deal value
    const totalDealValue = db.prepare(`
      SELECT COALESCE(SUM(value), 0) as total FROM deals WHERE stage NOT IN ('lost')
    `).get() as { total: number };

    // Get won deals value
    const wonDealsValue = db.prepare(`
      SELECT COALESCE(SUM(value), 0) as total FROM deals WHERE stage = 'won'
    `).get() as { total: number };

    // Get deals by stage
    const dealsByStage = db.prepare(`
      SELECT stage, COUNT(*) as count, COALESCE(SUM(value), 0) as value
      FROM deals
      GROUP BY stage
    `).all() as Array<{ stage: string; count: number; value: number }>;

    // Get recent deals
    const recentDeals = db.prepare(`
      SELECT
        d.*,
        c.first_name || ' ' || c.last_name as contact_name,
        co.name as company_name
      FROM deals d
      LEFT JOIN contacts c ON d.contact_id = c.id
      LEFT JOIN companies co ON d.company_id = co.id
      ORDER BY d.created_at DESC
      LIMIT 5
    `).all();

    // Get upcoming activities
    const upcomingActivities = db.prepare(`
      SELECT
        a.*,
        c.first_name || ' ' || c.last_name as contact_name,
        d.title as deal_title
      FROM activities a
      LEFT JOIN contacts c ON a.contact_id = c.id
      LEFT JOIN deals d ON a.deal_id = d.id
      WHERE a.completed = 0
      ORDER BY a.due_date ASC
      LIMIT 5
    `).all();

    // Get pending activities count
    const pendingActivities = db.prepare(`
      SELECT COUNT(*) as count FROM activities WHERE completed = 0
    `).get() as { count: number };

    // Get recent contacts
    const recentContacts = db.prepare(`
      SELECT
        c.*,
        co.name as company_name
      FROM contacts c
      LEFT JOIN companies co ON c.company_id = co.id
      ORDER BY c.created_at DESC
      LIMIT 4
    `).all();

    return NextResponse.json({
      stats: {
        totalContacts: totalContacts.count,
        totalCompanies: totalCompanies.count,
        totalDealValue: totalDealValue.total,
        wonDealsValue: wonDealsValue.total,
        pendingActivities: pendingActivities.count,
      },
      dealsByStage,
      recentDeals,
      upcomingActivities,
      recentContacts,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
