"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMeQuery } from "@/app/login/_core/auth.queries";
import { useUiStore } from "@/stores/ui-store";

export function Header() {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const { data: user } = useMeQuery();

  return (
    <header
      data-testid="header"
      className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-4"
    >
      <Button
        aria-label="Toggle sidebar"
        data-testid="sidebar-toggle-btn"
        className="size-10 bg-transparent px-0 text-foreground hover:bg-muted"
        onClick={toggleSidebar}
      >
        <Menu className="size-5" aria-hidden />
      </Button>
      {user && (
        <p data-testid="header-user-name" className="text-sm font-medium">
          {user.name}
        </p>
      )}
    </header>
  );
}
