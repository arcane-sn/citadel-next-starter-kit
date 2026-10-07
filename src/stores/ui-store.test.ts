import { beforeEach, describe, expect, test } from "vitest";
import { useUiStore } from "@/stores/ui-store";

describe("useUiStore", () => {
  beforeEach(() => {
    useUiStore.setState({ isSidebarOpen: true });
  });

  test("sidebar is open by default", () => {
    expect(useUiStore.getState().isSidebarOpen).toBe(true);
  });

  test("toggleSidebar closes an open sidebar", () => {
    useUiStore.getState().toggleSidebar();

    expect(useUiStore.getState().isSidebarOpen).toBe(false);
  });

  test("toggleSidebar reopens a closed sidebar", () => {
    useUiStore.getState().toggleSidebar();
    useUiStore.getState().toggleSidebar();

    expect(useUiStore.getState().isSidebarOpen).toBe(true);
  });
});
