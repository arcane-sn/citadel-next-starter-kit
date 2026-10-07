import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils/utils";

describe("cn", () => {
  it("keeps the last of conflicting Tailwind classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("drops falsy values", () => {
    expect(cn("text-sm", false, null, undefined, "font-bold")).toBe(
      "text-sm font-bold",
    );
  });

  it("applies conditional class objects", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });
});
