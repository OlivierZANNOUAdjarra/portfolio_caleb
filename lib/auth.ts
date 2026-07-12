const SEVEN_DAYS = 60 * 60 * 24 * 7;

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET manquant');
  return secret;
}

const encoder = new TextEncoder();

// Fonction de signature HMAC-SHA256 compatible Edge Runtime (sans import)
async function sign(payload: string): Promise<string> {
  const secret = getSecret();
  
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payload)
  );

  return Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Comparaison sécurisée en temps constant
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SEVEN_DAYS * 1000;
  const payload = `admin.${expires}`;
  const signature = await sign(payload);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [role, expiresStr, signature] = parts;
  const payload = `${role}.${expiresStr}`;
  const expectedSignature = await sign(payload);

  const validSignature = timingSafeEqual(signature, expectedSignature);
  if (!validSignature) return false;

  const expires = Number(expiresStr);
  if (Number.isNaN(expires) || Date.now() > expires) return false;

  return role === 'admin';
}

export function checkCredentials(email: string, password: string): boolean {
  const validEmail = process.env.ADMIN_EMAIL;
  const validPassword = process.env.ADMIN_PASSWORD;
  if (!validEmail || !validPassword) return false;
  return email === validEmail && password === validPassword;
}
