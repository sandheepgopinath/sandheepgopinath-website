import crypto from "crypto";

const SESSION_SECRET =
  process.env.AUTH_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  "chat-verification-salt-sandheep-portfolio";

// 30 minutes session duration for human chat verification
const SESSION_TTL_MS = 30 * 60 * 1000;

export function createChatSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(timestamp)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

export function isValidChatSessionToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  const now = Date.now();
  // Valid for up to 30 minutes, and not from the future (with 10s clock skew tolerance)
  if (now - timestamp > SESSION_TTL_MS || timestamp > now + 10000) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(timestampStr)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}
