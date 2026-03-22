"use client";

import { useState } from "react";
import AuthGuard from "./AuthGuard";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function ProtectedLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="lg:pl-64">
          <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
