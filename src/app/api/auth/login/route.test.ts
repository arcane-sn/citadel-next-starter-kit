// @vitest-environment node
import { describe, expect, test } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/auth/login/route";
import { DEMO_PASSWORD, DEMO_USER, SESSION_COOKIE } from "@/app/api/auth/_core/auth-mock";

const loginRequest = (body: unknown) =>
  new NextRequest("http://localhost/api/auth/login", {
    method: "POST",
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

describe("POST /api/auth/login", () => {
  test("returns the user and sets an httpOnly session cookie for valid credentials", async () => {
    const response = await POST(
      loginRequest({ email: DEMO_USER.email, password: DEMO_PASSWORD }),
    );
    const json = await response.json();

    expect(json).toEqual({ data: DEMO_USER, message: "ok", code: 200 });
    expect(response.cookies.get(SESSION_COOKIE)?.httpOnly).toBe(true);
  });

  test("returns code 401 and no cookie for wrong credentials", async () => {
    const response = await POST(
      loginRequest({ email: DEMO_USER.email, password: "wrong-password" }),
    );
    const json = await response.json();

    expect(json.code).toBe(401);
    expect(response.cookies.get(SESSION_COOKIE)).toBeUndefined();
  });

  test("returns code 400 when the payload fails validation", async () => {
    const response = await POST(loginRequest({ email: "nope", password: "x" }));

    expect((await response.json()).code).toBe(400);
  });

  test("returns code 400 when the body is not valid JSON", async () => {
    const response = await POST(loginRequest("{not json"));

    expect((await response.json()).code).toBe(400);
  });
});
