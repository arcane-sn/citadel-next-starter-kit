import { describe, expect, test } from "vitest";
import { z } from "zod";
import { ApiError, parseEnvelope, SUCCESS_CODE } from "@/lib/api-envelope/api-envelope";

const schema = z.object({ id: z.string() });

describe("parseEnvelope", () => {
  test("returns validated data when code is the success code", () => {
    const result = parseEnvelope(schema, {
      data: { id: "1" },
      message: "ok",
      code: SUCCESS_CODE,
    });

    expect(result).toEqual({ id: "1" });
  });

  test("throws ApiError with backend message and code when code is not success", () => {
    const payload = { data: null, message: "Invalid credentials", code: 401 };

    expect(() => parseEnvelope(schema, payload)).toThrow(ApiError);
    expect(() => parseEnvelope(schema, payload)).toThrow("Invalid credentials");
  });

  test("throws when data does not match the schema", () => {
    const payload = { data: { id: 1 }, message: "ok", code: SUCCESS_CODE };

    expect(() => parseEnvelope(schema, payload)).toThrow();
  });

  test("throws when payload is not an envelope", () => {
    expect(() => parseEnvelope(schema, { foo: "bar" })).toThrow();
  });
});
