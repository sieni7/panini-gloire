import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "panini_admin_session";
const maxAge = 60 * 60 * 8;
function secret() { return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PIN || "change-me"; }
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("base64url"); }
function validSession(value?: string) {
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = sign(expires); const a = Buffer.from(signature); const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
function json(statusCode: number, body: unknown) { return { statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }; }
function cookieValue(header = "") { return header.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1); }
function config() { return { owner: process.env.GITHUB_OWNER, repo: process.env.GITHUB_REPO, branch: process.env.GITHUB_BRANCH || "main", token: process.env.GITHUB_TOKEN }; }

async function github(path: string, init: RequestInit = {}) {
  const { token } = config();
  return fetch(`https://api.github.com/repos/${config().owner}/${config().repo}/contents/${path}`, { ...init, headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json", ...(init.headers || {}) } });
}

async function upsert(path: string, content: string, message: string, alreadyBase64 = false) {
  const { branch } = config();
  const current = await github(path);
  let sha: string | undefined;
  if (current.ok) sha = ((await current.json()) as { sha?: string }).sha;
  const response = await github(path, { method: "PUT", body: JSON.stringify({ message, content: alreadyBase64 ? content : Buffer.from(content, "utf8").toString("base64"), branch, ...(sha ? { sha } : {}) }) });
  if (!response.ok) throw new Error(`GitHub publication failed (${response.status})`);
  return response.json();
}

export async function handler(event: { httpMethod?: string; body?: string; headers?: Record<string, string> }) {
  if (event.httpMethod !== "POST") return json(405, { error: "Méthode non autorisée" });
  const { owner, repo, token } = config();
  const cookie = event.headers?.cookie || event.headers?.Cookie;
  if (!owner || !repo || !token || !validSession(cookieValue(cookie))) return json(401, { error: "Session administrateur invalide" });
  let body: { products?: unknown[]; categories?: unknown[]; site?: Record<string, unknown>; message?: string } = {};
  try { body = JSON.parse(event.body || "{}"); } catch { return json(400, { error: "Données invalides" }); }
  if (!Array.isArray(body.products) || !Array.isArray(body.categories) || !body.site || typeof body.site !== "object") return json(400, { error: "Le catalogue, les catégories et les informations du site sont requis" });
  try {
    const uploads: Array<{ path: string; base64: string }> = [];
    const publishedProducts = body.products.map((item) => {
      const product = item as { id?: string; image?: string };
      if (product.image?.startsWith("data:image/")) {
        const match = product.image.match(/^data:image\/(png|jpeg|webp);base64,(.+)$/);
        if (!match || !product.id) throw new Error("Image produit invalide");
        const extension = match[1] === "jpeg" ? "jpg" : match[1];
        uploads.push({ path: `client/public/images/${product.id}.${extension}`, base64: match[2] });
        return { ...product, image: `/images/${product.id}.${extension}` };
      }
      return product;
    });
    for (const upload of uploads) await upsert(upload.path, upload.base64, body.message || "chore: update product image", true);
    await upsert("client/public/data/products.json", `${JSON.stringify(publishedProducts, null, 2)}\n`, body.message || "chore: update editable catalogue");
    await upsert("client/public/data/categories.json", `${JSON.stringify(body.categories, null, 2)}\n`, body.message || "chore: update editable categories");
    await upsert("client/public/data/site.json", `${JSON.stringify(body.site, null, 2)}\n`, body.message || "chore: update editable site information");
    return json(200, { ok: true, message: "Proposition GitHub créée" });
  } catch (error) { return json(502, { error: error instanceof Error ? error.message : "Publication impossible" }); }
}
