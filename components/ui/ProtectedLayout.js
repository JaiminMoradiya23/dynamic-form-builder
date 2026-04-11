"use client";

import { useState } from "react";
import AuthGuard from "./AuthGuard";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function ProtectedLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex h-full min-h-0 w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex h-full min-h-0 flex-1 flex-col lg:pl-[264px]">
          <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
          <main className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
