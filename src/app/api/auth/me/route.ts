import type { NextRequest } from "next/server";
import {
  DEMO_USER,
  SESSION_COOKIE,
  envelope,
} from "@/app/api/auth/_core/auth-mock";

const UNAUTHORIZED = 401;

export function GET(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE)?.value;

  if (session !== DEMO_USER.id) {
    return envelope(null, "Unauthorized", UNAUTHORIZED);
  }

  return envelope(DEMO_USER, "ok");
}
