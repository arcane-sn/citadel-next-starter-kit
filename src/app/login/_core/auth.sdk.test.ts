import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("@/lib/axios/axios", () => ({
  api: { post: vi.fn(), get: vi.fn() },
}));

import { api } from "@/lib/axios/axios";
import { ApiError } from "@/lib/api-envelope/api-envelope";
import { authSdk } from "@/app/login/_core/auth.sdk";

const user = { id: "1", name: "Ezra", email: "ezra@example.com" };
const credentials = { email: "ezra@example.com", password: "password123" };

describe("authSdk", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("login posts credentials and returns the parsed user", async () => {
    vi.mocked(api.post).mockResolvedValue({
      data: { data: user, message: "ok", code: 200 },
    });

    const result = await authSdk.login(credentials);

    expect(api.post).toHaveBeenCalledWith("/auth/login", credentials);
    expect(result).toEqual(user);
  });

  test("login throws ApiError when code is not success", async () => {
    vi.mocked(api.post).mockResolvedValue({
      data: { data: null, message: "Invalid credentials", code: 401 },
    });

    await expect(authSdk.login(credentials)).rejects.toBeInstanceOf(ApiError);
  });

  test("me returns the parsed current user", async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: { data: user, message: "ok", code: 200 },
    });

    const result = await authSdk.me();

    expect(api.get).toHaveBeenCalledWith("/auth/me");
    expect(result).toEqual(user);
  });

  test("me throws when the user payload fails schema validation", async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: { data: { id: 1 }, message: "ok", code: 200 },
    });

    await expect(authSdk.me()).rejects.toThrow();
  });
});
