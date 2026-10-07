import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const useMeQuery = vi.fn();
vi.mock("@/app/login/_core/auth.queries", () => ({
  useMeQuery: () => useMeQuery(),
}));

import { Header } from "@/components/shared/header/header";
import { useUiStore } from "@/stores/ui-store";

describe("Header", () => {
  beforeEach(() => {
    useUiStore.setState({ isSidebarOpen: true });
    useMeQuery.mockReturnValue({ data: undefined });
  });

  test("toggles the sidebar when the toggle button is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByTestId("sidebar-toggle-btn"));

    expect(useUiStore.getState().isSidebarOpen).toBe(false);
  });

  test("shows the current user name when loaded", () => {
    useMeQuery.mockReturnValue({ data: { id: "1", name: "Ezra", email: "e@x.com" } });
    render(<Header />);

    expect(screen.getByTestId("header-user-name")).toHaveTextContent("Ezra");
  });

  test("hides the user name while there is no user", () => {
    render(<Header />);

    expect(screen.queryByTestId("header-user-name")).not.toBeInTheDocument();
  });
});
