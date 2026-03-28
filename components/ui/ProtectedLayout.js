"use client";

import { useState } from "react";
import AuthGuard from "./AuthGuard";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function ProtectedLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex h-dvh max-h-dvh min-h-0 bg-slate-50 dark:bg-slate-950">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex min-h-0 flex-1 flex-col lg:pl-[264px]">
          <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
          <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
