import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { useQueryClient } from "@tanstack/react-query";
import { Providers } from "@/components/shared/providers/providers";

function QueryClientProbe() {
  const queryClient = useQueryClient();
  return <p data-testid="probe">{queryClient ? "ready" : "missing"}</p>;
}

describe("Providers", () => {
  it("renders children with a QueryClient available", () => {
    render(
      <Providers>
        <QueryClientProbe />
      </Providers>,
    );

    expect(screen.getByTestId("probe")).toHaveTextContent("ready");
  });
});
