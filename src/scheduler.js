import cron from "node-cron";
import { cronSchedule, keywords } from "./config.js";
import { runCheck } from "./findcoffee.js";

let isRunning = false;
cron.schedule(cronSchedule, async () => {
  if (isRunning) {
    console.warn('Previous run still in progress, skipping this tick');
    return;
  }
  isRunning = true;
  try {
    await runCheck();
  } catch (err) {
    console.error('runCheck failed:', err);
  } finally {
    isRunning = false;
  }
});