"use client";

import ProtectedLayout from "@/components/ui/ProtectedLayout";

export default function DashboardPage() {
  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Total Forms", "Total Fields", "Last Edited"].map((label) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-sm text-slate-400 dark:text-slate-500">
                {label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                &mdash;
              </p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedLayout>
  );
}
