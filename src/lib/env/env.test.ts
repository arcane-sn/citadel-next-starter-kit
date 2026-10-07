import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const loadEnv = () => import("@/lib/env/env");

describe("env", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("exposes the API url when it is a valid URL", async () => {
    // Arrange
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:8000/api");

    // Act
    const { env } = await loadEnv();

    // Assert
    expect(env.NEXT_PUBLIC_API_URL).toBe("http://localhost:8000/api");
  });

  it("throws when NEXT_PUBLIC_API_URL is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", undefined);

    await expect(loadEnv()).rejects.toThrow();
  });

  it("throws when NEXT_PUBLIC_API_URL is not a URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "not-a-url");

    await expect(loadEnv()).rejects.toThrow();
  });
});
