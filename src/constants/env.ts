export const NODE_ENV = process.env.NODE_ENV || "unknown";
export const APP_ENV =
  process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV || "local";
export const IS_PRODUCTION = NODE_ENV === "production";

export const NEXT_PUBLIC_APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const APP_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : NEXT_PUBLIC_APP_URL;

export const SENTRY_DSN =
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || "";

export const E2E_HOST = process.env.E2E_HOST || "http://127.0.0.1:3000";
