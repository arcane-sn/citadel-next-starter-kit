import { NextResponse } from "next/server";
import { SUCCESS_CODE } from "@/lib/api-envelope/api-envelope";

export const SESSION_COOKIE = "session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;

export const DEMO_USER = {
  id: "1",
  name: "Admin",
  email: "admin@citadel.dev",
};
export const DEMO_PASSWORD = "password123";

export const envelope = <T>(
  data: T,
  message: string,
  code: number = SUCCESS_CODE,
) => NextResponse.json({ data, message, code });
