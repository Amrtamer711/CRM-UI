import db from './db';

const avatarColors = [
  '#c9a962', '#7d8b7a', '#8b7355', '#6b7c8f', '#9b7a7a',
  '#7a8b6b', '#8b6b7a', '#6b8b8b', '#a08050', '#7a6b8b'
];

const companies = [
  { name: 'Meridian Ventures', industry: 'Venture Capital', website: 'meridianvc.com', size: '50-100', revenue: '$50M-100M', location: 'San Francisco, CA', logo_color: '#c9a962' },
  { name: 'Atlas Architecture', industry: 'Architecture', website: 'atlasarch.co', size: '20-50', revenue: '$10M-25M', location: 'New York, NY', logo_color: '#7d8b7a' },
  { name: 'Novus Therapeutics', industry: 'Biotechnology', website: 'novusthera.com', size: '100-250', revenue: '$100M-250M', location: 'Boston, MA', logo_color: '#8b7355' },
  { name: 'Cipher Security', industry: 'Cybersecurity', website: 'ciphersec.io', size: '50-100', revenue: '$25M-50M', location: 'Austin, TX', logo_color: '#6b7c8f' },
  { name: 'Verdant Foods', industry: 'Food & Beverage', website: 'verdantfoods.com', size: '250-500', revenue: '$250M-500M', location: 'Chicago, IL', logo_color: '#7a8b6b' },
  { name: 'Lumen Media', industry: 'Digital Media', website: 'lumenmedia.co', size: '20-50', revenue: '$5M-10M', location: 'Los Angeles, CA', logo_color: '#9b7a7a' },
  { name: 'Stratos Aviation', industry: 'Aerospace', website: 'stratosav.com', size: '500-1000', revenue: '$500M+', location: 'Seattle, WA', logo_color: '#6b8b8b' },
  { name: 'Helix Consulting', industry: 'Management Consulting', website: 'helixconsult.com', size: '100-250', revenue: '$50M-100M', location: 'Washington, DC', logo_color: '#8b6b7a' },
];

const contacts = [
  { first_name: 'Alexandra', last_name: 'Chen', email: 'a.chen@meridianvc.com', phone: '+1 (415) 555-0142', title: 'Managing Partner', company_id: 1, status: 'active', avatar_color: avatarColors[0], last_contacted: '2024-12-08' },
  { first_name: 'Marcus', last_name: 'Webb', email: 'm.webb@atlasarch.co', phone: '+1 (212) 555-0198', title: 'Principal Architect', company_id: 2, status: 'active', avatar_color: avatarColors[1], last_contacted: '2024-12-05' },
  { first_name: 'Dr. Sarah', last_name: 'Okonkwo', email: 's.okonkwo@novusthera.com', phone: '+1 (617) 555-0234', title: 'Chief Scientific Officer', company_id: 3, status: 'active', avatar_color: avatarColors[2], last_contacted: '2024-12-09' },
  { first_name: 'James', last_name: 'Morrison', email: 'j.morrison@ciphersec.io', phone: '+1 (512) 555-0187', title: 'VP of Engineering', company_id: 4, status: 'active', avatar_color: avatarColors[3], last_contacted: '2024-12-01' },
  { first_name: 'Elena', last_name: 'Vasquez', email: 'e.vasquez@verdantfoods.com', phone: '+1 (312) 555-0156', title: 'Director of Procurement', company_id: 5, status: 'active', avatar_color: avatarColors[4], last_contacted: '2024-12-07' },
  { first_name: 'David', last_name: 'Park', email: 'd.park@lumenmedia.co', phone: '+1 (310) 555-0223', title: 'Creative Director', company_id: 6, status: 'active', avatar_color: avatarColors[5], last_contacted: '2024-11-28' },
  { first_name: 'Natasha', last_name: 'Volkov', email: 'n.volkov@stratosav.com', phone: '+1 (206) 555-0189', title: 'Chief Operations Officer', company_id: 7, status: 'active', avatar_color: avatarColors[6], last_contacted: '2024-12-10' },
  { first_name: 'Robert', last_name: 'Fitzgerald', email: 'r.fitzgerald@helixconsult.com', phone: '+1 (202) 555-0145', title: 'Senior Partner', company_id: 8, status: 'active', avatar_color: avatarColors[7], last_contacted: '2024-12-03' },
  { first_name: 'Priya', last_name: 'Sharma', email: 'p.sharma@meridianvc.com', phone: '+1 (415) 555-0167', title: 'Investment Analyst', company_id: 1, status: 'active', avatar_color: avatarColors[8], last_contacted: '2024-12-06' },
  { first_name: 'Michael', last_name: 'Torres', email: 'm.torres@novusthera.com', phone: '+1 (617) 555-0278', title: 'Business Development Lead', company_id: 3, status: 'lead', avatar_color: avatarColors[9], last_contacted: '2024-11-25' },
  { first_name: 'Catherine', last_name: 'Dubois', email: 'c.dubois@atlasarch.co', phone: '+1 (212) 555-0234', title: 'Project Manager', company_id: 2, status: 'active', avatar_color: avatarColors[0], last_contacted: '2024-12-04' },
  { first_name: 'Jonathan', last_name: 'Blackwell', email: 'j.blackwell@ciphersec.io', phone: '+1 (512) 555-0145', title: 'CEO', company_id: 4, status: 'active', avatar_color: avatarColors[1], last_contacted: '2024-12-09' },
];

const deals = [
  { title: 'Enterprise Security Suite', value: 450000, stage: 'negotiation', probability: 75, contact_id: 4, company_id: 4, expected_close: '2025-01-15', description: 'Full enterprise deployment of security monitoring and threat detection suite.' },
  { title: 'Series B Investment', value: 2500000, stage: 'proposal', probability: 40, contact_id: 1, company_id: 1, expected_close: '2025-02-28', description: 'Lead investor position in Series B funding round.' },
  { title: 'Headquarters Redesign', value: 180000, stage: 'qualified', probability: 60, contact_id: 2, company_id: 2, expected_close: '2025-03-01', description: 'Complete interior architecture redesign for new headquarters.' },
  { title: 'Clinical Trial Software', value: 320000, stage: 'won', probability: 100, contact_id: 3, company_id: 3, expected_close: '2024-12-01', description: 'Custom software platform for managing Phase 3 clinical trials.' },
  { title: 'Supply Chain Platform', value: 275000, stage: 'proposal', probability: 55, contact_id: 5, company_id: 5, expected_close: '2025-01-30', description: 'End-to-end supply chain management and tracking system.' },
  { title: 'Brand Campaign 2025', value: 95000, stage: 'lead', probability: 20, contact_id: 6, company_id: 6, expected_close: '2025-04-15', description: 'Comprehensive digital marketing and brand refresh campaign.' },
  { title: 'Fleet Management System', value: 890000, stage: 'negotiation', probability: 80, contact_id: 7, company_id: 7, expected_close: '2025-01-20', description: 'Real-time fleet tracking and maintenance scheduling system.' },
  { title: 'Digital Transformation', value: 520000, stage: 'qualified', probability: 45, contact_id: 8, company_id: 8, expected_close: '2025-02-15', description: 'Strategic consulting for complete digital transformation initiative.' },
  { title: 'Data Analytics Platform', value: 150000, stage: 'lead', probability: 15, contact_id: 9, company_id: 1, expected_close: '2025-05-01', description: 'Custom analytics dashboard for portfolio company monitoring.' },
  { title: 'Security Audit', value: 45000, stage: 'won', probability: 100, contact_id: 12, company_id: 4, expected_close: '2024-11-15', description: 'Comprehensive security audit and penetration testing.' },
  { title: 'Research Collaboration', value: 680000, stage: 'proposal', probability: 50, contact_id: 10, company_id: 3, expected_close: '2025-03-30', description: 'Joint research partnership for new therapeutic development.' },
  { title: 'Office Expansion', value: 220000, stage: 'lost', probability: 0, contact_id: 11, company_id: 2, expected_close: '2024-10-01', description: 'Design services for new satellite office location.' },
];

const activities = [
  { type: 'call', title: 'Follow-up call with Alexandra', description: 'Discuss Series B terms and timeline', contact_id: 1, deal_id: 2, due_date: '2024-12-12 10:00:00', completed: 0, priority: 'high' },
  { type: 'meeting', title: 'Contract review meeting', description: 'Final contract negotiation with legal teams', contact_id: 4, deal_id: 1, due_date: '2024-12-13 14:00:00', completed: 0, priority: 'high' },
  { type: 'email', title: 'Send revised proposal', description: 'Updated pricing and scope for headquarters redesign', contact_id: 2, deal_id: 3, due_date: '2024-12-11 17:00:00', completed: 0, priority: 'medium' },
  { type: 'task', title: 'Prepare demo environment', description: 'Set up sandbox for supply chain platform demo', contact_id: 5, deal_id: 5, due_date: '2024-12-14 09:00:00', completed: 0, priority: 'medium' },
  { type: 'call', title: 'Quarterly check-in', description: 'Regular relationship maintenance call', contact_id: 3, deal_id: 4, due_date: '2024-12-10 15:30:00', completed: 1, priority: 'low' },
  { type: 'meeting', title: 'Strategy presentation', description: 'Present digital transformation roadmap', contact_id: 8, deal_id: 8, due_date: '2024-12-16 11:00:00', completed: 0, priority: 'high' },
  { type: 'task', title: 'Update CRM records', description: 'Add meeting notes and update deal stages', contact_id: null, deal_id: null, due_date: '2024-12-11 18:00:00', completed: 0, priority: 'low' },
  { type: 'email', title: 'Introduction email', description: 'Initial outreach for brand campaign opportunity', contact_id: 6, deal_id: 6, due_date: '2024-12-12 09:00:00', completed: 0, priority: 'medium' },
  { type: 'meeting', title: 'Technical requirements review', description: 'Deep dive on fleet management system specs', contact_id: 7, deal_id: 7, due_date: '2024-12-15 10:00:00', completed: 0, priority: 'high' },
  { type: 'call', title: 'Renewal discussion', description: 'Discuss contract renewal and expansion', contact_id: 12, deal_id: 10, due_date: '2024-12-17 14:00:00', completed: 0, priority: 'medium' },
];

const notes = [
  { content: 'Alexandra mentioned they are particularly interested in AI/ML startups. She has a strong network in the healthcare tech space.', contact_id: 1, deal_id: 2 },
  { content: 'Marcus prefers detailed technical specifications upfront. Values sustainable design practices highly.', contact_id: 2, deal_id: 3 },
  { content: 'Dr. Okonkwo is very detail-oriented. Requires extensive documentation for all technical implementations.', contact_id: 3, deal_id: 4 },
  { content: 'James is the key technical decision maker. Jonathan (CEO) handles final budget approval.', contact_id: 4, deal_id: 1 },
  { content: 'Verdant is expanding rapidly. Elena mentioned potential for multiple future projects if this goes well.', contact_id: 5, deal_id: 5 },
  { content: 'Fleet management is a critical pain point for Stratos. Current system causing significant delays.', contact_id: 7, deal_id: 7 },
];

export function seedDatabase() {
  // Check if data already exists
  const existingCompanies = db.prepare('SELECT COUNT(*) as count FROM companies').get() as { count: number };

  if (existingCompanies.count > 0) {
    console.log('Database already seeded');
    return;
  }

  const insertCompany = db.prepare(`
    INSERT INTO companies (name, industry, website, size, revenue, location, logo_color)
    VALUES (@name, @industry, @website, @size, @revenue, @location, @logo_color)
  `);

  const insertContact = db.prepare(`
    INSERT INTO contacts (first_name, last_name, email, phone, title, company_id, status, avatar_color, last_contacted)
    VALUES (@first_name, @last_name, @email, @phone, @title, @company_id, @status, @avatar_color, @last_contacted)
  `);

  const insertDeal = db.prepare(`
    INSERT INTO deals (title, value, stage, probability, contact_id, company_id, expected_close, description)
    VALUES (@title, @value, @stage, @probability, @contact_id, @company_id, @expected_close, @description)
  `);

  const insertActivity = db.prepare(`
    INSERT INTO activities (type, title, description, contact_id, deal_id, due_date, completed, priority)
    VALUES (@type, @title, @description, @contact_id, @deal_id, @due_date, @completed, @priority)
  `);

  const insertNote = db.prepare(`
    INSERT INTO notes (content, contact_id, deal_id)
    VALUES (@content, @contact_id, @deal_id)
  `);

  const seedAll = db.transaction(() => {
    companies.forEach(company => insertCompany.run(company));
    contacts.forEach(contact => insertContact.run(contact));
    deals.forEach(deal => insertDeal.run(deal));
    activities.forEach(activity => insertActivity.run(activity));
    notes.forEach(note => insertNote.run(note));
  });

  seedAll();
  console.log('Database seeded successfully');
}
