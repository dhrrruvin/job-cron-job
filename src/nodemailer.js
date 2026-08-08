import nodemailer from "nodemailer";
import { mailConfig } from "./config.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailConfig.email,
    pass: mailConfig.password
  }
});

export async function sendJobAlert(jobs) {
  if (!jobs.length) return;

  const html = `
    <h2>${jobs.length} new job(s) found</h2>
    <ul>
      ${jobs.map(j => `
        <li>
          <b>${j.company}</b> — ${j.title} (${j.location || 'N/A'})<br/>
          <a href="${j.url}">${"Click here to apply" ?? "Not Available"}</a>
        </li>`).join('')}
    </ul>
  `;

  try {
    console.log("sending email alert");
    await transporter.sendMail({
      from: `"Job Notifier" <${mailConfig.email}>`,
      to: mailConfig.email,
      subject: `🔔 ${jobs.length} new job posting(s)`,
      html,
    });
  } catch (error) {
    console.log("failed to send mail");
    console.log(error);
  }
}