import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "panini_admin_session";
const maxAge = 60 * 60 * 8;

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PIN || "change-me";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function createSession() {
  const payload = `${Date.now() + maxAge * 1000}`;
  return `${payload}.${sign(payload)}`;
}

function validSession(value?: string) {
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = sign(expires);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function json(statusCode: number, body: unknown, headers: Record<string, string> = {}) {
  return { statusCode, headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) };
}

export async function handler(event: { httpMethod?: string; body?: string; headers?: Record<string, string> }) {
  if (event.httpMethod !== "POST") return json(405, { error: "Méthode non autorisée" });
  let body: { pin?: string; action?: string } = {};
  try { body = JSON.parse(event.body || "{}"); } catch { return json(400, { error: "Requête invalide" }); }

  if (body.action === "logout") {
    return json(200, { ok: true }, { "Set-Cookie": `${cookieName}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict` });
  }

  if (!body.pin || body.pin !== process.env.ADMIN_PIN) return json(401, { error: "Identifiants invalides" });
  const session = createSession();
  return json(200, { ok: true }, { "Set-Cookie": `${cookieName}=${session}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Strict` });
}

export { cookieName, validSession };
