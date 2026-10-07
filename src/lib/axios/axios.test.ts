import { describe, expect, it, vi } from "vitest";
import type { InternalAxiosRequestConfig } from "axios";

vi.mock("@/lib/env/env", () => ({
  env: { NEXT_PUBLIC_API_URL: "http://api.test" },
}));

import { api } from "@/lib/axios/axios";

describe("api instance", () => {
  it("uses the validated API url as baseURL", () => {
    expect(api.defaults.baseURL).toBe("http://api.test");
  });

  it("sends credentials so httpOnly cookies are included", () => {
    expect(api.defaults.withCredentials).toBe(true);
  });

  it("times out after 15 seconds", () => {
    expect(api.defaults.timeout).toBe(15_000);
  });

  it("passes successful responses through untouched", async () => {
    const adapter = async (config: InternalAxiosRequestConfig) => ({
      data: { data: "ok", message: "success", code: 200 },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    });

    const response = await api.get("/ping", { adapter });

    expect(response.data).toEqual({ data: "ok", message: "success", code: 200 });
  });

  it("rejects with the original error when a request fails", async () => {
    const failure = new Error("network down");
    const adapter = async () => {
      throw failure;
    };

    await expect(api.get("/ping", { adapter })).rejects.toBe(failure);
  });
});
