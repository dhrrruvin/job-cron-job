import adapters from "./adapters/index.js";
import { sendJobAlert } from "./nodemailer.js";
import { keywords } from "./config.js";
import { loadSeen, saveSeen } from "./store.js";

export async function runCheck() {
  const seen = await loadSeen();
  const results = await Promise.allSettled(adapters.map(a => a.fetch()));

  const newJobs = [];
  results.forEach((result, i) => {
    if (result.status === 'rejected') {
      console.error(`[${adapters[i].name}] failed:`, result.reason.message);
      return;
    }
    for (const job of result.value) {
      // TODO: find best match
      const matches = keywords.some(k =>
        job.title.toLowerCase().includes(k.toLowerCase())
      );
      if (matches && !seen.has(job.id)) {
        newJobs.push(job);
        seen.add(job.id);
      }
    }
  });

  if (newJobs.length) await sendJobAlert(newJobs);
  await saveSeen(seen);
}

await runCheck();