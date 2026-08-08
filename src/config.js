import dotenv from "dotenv";

dotenv.config();

export const mailConfig = {
  email: process.env.EMAIL,
  password: process.env.APP_PASSWORD
}

export const cronSchedule = process.env.CRON_SCHEDULE;
export const keywords = ['software engineer', 'software development engineer',
  'frontend developer', 'sde', 'react', 'frontend', 'SE'];
