import type { NextRequest } from "next/server";
import { loginSchema } from "@/app/login/_core/auth.types";
import {
  DEMO_PASSWORD,
  DEMO_USER,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  envelope,
} from "@/app/api/auth/_core/auth-mock";

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return envelope(null, "Data tidak valid", BAD_REQUEST);
  }

  const { email, password } = parsed.data;
  if (email !== DEMO_USER.email || password !== DEMO_PASSWORD) {
    return envelope(null, "Email atau password salah", UNAUTHORIZED);
  }

  const response = envelope(DEMO_USER, "ok");
  response.cookies.set(SESSION_COOKIE, DEMO_USER.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
