import { LayoutDashboard, type LucideIcon } from "lucide-react";

export interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const SIDEBAR_ITEMS: readonly SidebarItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];
