"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/utils";
import { useUiStore } from "@/stores/ui-store";
import { SIDEBAR_ITEMS } from "@/components/shared/sidebar/sidebar.constants";

export function Sidebar() {
  const pathname = usePathname();
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);

  if (!isSidebarOpen) return null;

  return (
    <aside
      data-testid="sidebar"
      className="flex w-64 shrink-0 flex-col border-r border-border bg-background"
    >
      <div className="flex h-16 items-center border-b border-border px-6 text-lg font-semibold">
        🏰 Citadel
      </div>
      <nav aria-label="Menu utama" className="flex flex-col gap-1 p-4">
        {SIDEBAR_ITEMS.map(({ key, label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={key}
              href={href}
              data-testid={`sidebar-link-${key}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                isActive && "bg-muted text-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
