import { NextResponse } from "next/server";
import { Resend } from "resend";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const recentRequests = new Map<string, number[]>();

function sanitizeString(value: unknown): string {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "local";
}

function isRateLimited(request: Request) {
  const ip = getClientIp(request);
  const now = Date.now();
  const timestamps = recentRequests.get(ip) ?? [];
  const filtered = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (filtered.length >= RATE_LIMIT_MAX_REQUESTS) {
    recentRequests.set(ip, filtered);
    return true;
  }

  filtered.push(now);
  recentRequests.set(ip, filtered);
  return false;
}

export async function POST(req: Request) {
  try {
    const { name = "", email = "", message = "", company = "" } = await req.json();
    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_TO_EMAIL;
    const senderEmail = process.env.CONTACT_FROM_EMAIL;

    if (isRateLimited(req)) {
      return NextResponse.json(
        { message: "Too many messages. Please try again in a minute." },
        { status: 429 },
      );
    }

    if (company) {
      return NextResponse.json({ ok: true });
    }

    if (!apiKey || !recipientEmail || !senderEmail) {
      return NextResponse.json(
        { message: "The contact form is not configured yet. Add your Resend environment variables to enable email delivery." },
        { status: 503 },
      );
    }

    const safeName = sanitizeString(name);
    const safeEmail = sanitizeString(email).toLowerCase();
    const safeMessage = sanitizeString(message);

    if (!safeName || !safeEmail || !safeMessage) {
      return NextResponse.json({ message: "Please complete all fields before sending." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    const newlinePattern = /[\r\n]/;
    if (newlinePattern.test(safeName) || newlinePattern.test(safeEmail) || newlinePattern.test(safeMessage)) {
      return NextResponse.json({ message: "Unsupported characters detected in the form." }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      replyTo: safeEmail,
      subject: `Portfolio message from ${safeName}`,
      text: `From: ${safeName} <${safeEmail}>\n\n${safeMessage}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send your message right now.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
