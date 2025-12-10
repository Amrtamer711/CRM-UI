import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'crm.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    industry TEXT,
    website TEXT,
    size TEXT,
    revenue TEXT,
    location TEXT,
    logo_color TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    title TEXT,
    company_id INTEGER,
    status TEXT DEFAULT 'active',
    avatar_color TEXT,
    last_contacted DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
  );

  CREATE TABLE IF NOT EXISTS deals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    value REAL,
    stage TEXT DEFAULT 'lead',
    probability INTEGER DEFAULT 10,
    contact_id INTEGER,
    company_id INTEGER,
    expected_close DATE,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contact_id) REFERENCES contacts(id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
  );

  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    contact_id INTEGER,
    deal_id INTEGER,
    due_date DATETIME,
    completed INTEGER DEFAULT 0,
    priority TEXT DEFAULT 'medium',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contact_id) REFERENCES contacts(id),
    FOREIGN KEY (deal_id) REFERENCES deals(id)
  );

  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    contact_id INTEGER,
    deal_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contact_id) REFERENCES contacts(id),
    FOREIGN KEY (deal_id) REFERENCES deals(id)
  );
`);

export default db;

// Type definitions
export interface Company {
  id: number;
  name: string;
  industry: string | null;
  website: string | null;
  size: string | null;
  revenue: string | null;
  location: string | null;
  logo_color: string | null;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  title: string | null;
  company_id: number | null;
  status: string;
  avatar_color: string | null;
  last_contacted: string | null;
  created_at: string;
  updated_at: string;
  company_name?: string;
}

export interface Deal {
  id: number;
  title: string;
  value: number | null;
  stage: string;
  probability: number;
  contact_id: number | null;
  company_id: number | null;
  expected_close: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  contact_name?: string;
  company_name?: string;
}

export interface Activity {
  id: number;
  type: string;
  title: string;
  description: string | null;
  contact_id: number | null;
  deal_id: number | null;
  due_date: string | null;
  completed: number;
  priority: string;
  created_at: string;
  contact_name?: string;
  deal_title?: string;
}

export interface Note {
  id: number;
  content: string;
  contact_id: number | null;
  deal_id: number | null;
  created_at: string;
}
