"use client";

import ProtectedLayout from "@/components/ui/ProtectedLayout";

export default function DashboardPage() {
  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-slate-900 dark:text-slate-50">
            Overview
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Welcome to your form builder dashboard.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Total Forms", "Total Fields", "Last Edited"].map((label) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 dark:border-slate-700 dark:bg-slate-800"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {label}
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
                —
              </p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedLayout>
  );
}
