import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export async function sendMail(opts: { to: string; subject: string; html: string }) {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    // eslint-disable-next-line no-console
    console.warn("SMTP not configured. Skipping email send.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT ?? 587,
    secure: false,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
  });

  await transporter.sendMail({
    from: env.SMTP_FROM || env.SMTP_USER,
    to: opts.to,
    subject: opts.subject,
    html: opts.html
  });
}

