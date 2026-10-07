// @vitest-environment node
import { describe, expect, test } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/auth/me/route";
import { DEMO_USER, SESSION_COOKIE } from "@/app/api/auth/_core/auth-mock";

const meRequest = (cookie?: string) =>
  new NextRequest("http://localhost/api/auth/me", {
    headers: cookie ? { cookie } : {},
  });

describe("GET /api/auth/me", () => {
  test("returns the user when the session cookie is valid", async () => {
    const response = GET(meRequest(`${SESSION_COOKIE}=${DEMO_USER.id}`));

    expect(await response.json()).toEqual({ data: DEMO_USER, message: "ok", code: 200 });
  });

  test("returns code 401 when there is no session cookie", async () => {
    const response = GET(meRequest());

    expect((await response.json()).code).toBe(401);
  });

  test("returns code 401 when the session cookie is invalid", async () => {
    const response = GET(meRequest(`${SESSION_COOKIE}=999`));

    expect((await response.json()).code).toBe(401);
  });
});
