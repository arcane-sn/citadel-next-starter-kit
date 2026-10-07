import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const usePathname = vi.fn();
vi.mock("next/navigation", () => ({ usePathname: () => usePathname() }));

import { Sidebar } from "@/components/shared/sidebar/sidebar";
import { useUiStore } from "@/stores/ui-store";

describe("Sidebar", () => {
  beforeEach(() => {
    useUiStore.setState({ isSidebarOpen: true });
    usePathname.mockReturnValue("/dashboard");
  });

  test("renders navigation links", () => {
    render(<Sidebar />);

    expect(screen.getByTestId("sidebar-link-dashboard")).toHaveAttribute(
      "href",
      "/dashboard",
    );
  });

  test("marks the link matching the current path as active", () => {
    render(<Sidebar />);

    expect(screen.getByTestId("sidebar-link-dashboard")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("does not mark the link active on another path", () => {
    usePathname.mockReturnValue("/login");
    render(<Sidebar />);

    expect(screen.getByTestId("sidebar-link-dashboard")).not.toHaveAttribute(
      "aria-current",
    );
  });

  test("renders nothing when the sidebar is closed", () => {
    useUiStore.setState({ isSidebarOpen: false });
    render(<Sidebar />);

    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
  });
});
