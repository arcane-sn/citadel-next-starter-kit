import type { ReactNode } from "react";
import { Header } from "@/components/shared/header/header";
import { Sidebar } from "@/components/shared/sidebar/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main data-testid="dashboard-main" className="flex-1 bg-muted p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
