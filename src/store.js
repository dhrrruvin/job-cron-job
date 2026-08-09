import fs from 'fs';
import path from 'path';
import { pool } from "./db.js";

export async function loadSeen() {
  try {
    const { rows } = await pool.query('SELECT job_id FROM seen_jobs');
    console.log("found data: ", rows);
    return new Set(rows.map(r => r.job_id));
  } catch (error) {
    console.log("error fetching data, ", error);
    throw error;
  }
}

export async function saveSeen(jobs) {
  try {
    if (!jobs.length) return;

    const values = [];
    const placeholders = jobs.map((job, i) => {
      const offset = i * 6;
      values.push(job.id, job.company, job.title, job.location || null, job.url, job.postedDate || null);
      return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6})`;
    });

    const query = `
    INSERT INTO seen_jobs (job_id, company, title, location, url, posted_date)
    VALUES ${placeholders.join(', ')}
    ON CONFLICT (job_id) DO NOTHING
    `;
    console.log("writing to db: ", query, values);
    await pool.query(query, values);
  } catch (error) {
    console.log("error writing to database, ", error.message);
  }
}