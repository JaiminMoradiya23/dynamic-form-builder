"use client";

import { useState } from "react";
import AuthGuard from "./AuthGuard";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function ProtectedLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex flex-1 flex-col lg:pl-[264px]">
          <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
