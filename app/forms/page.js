"use client";

import ProtectedLayout from "@/components/ui/ProtectedLayout";

export default function FormsPage() {
  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-slate-900 dark:text-slate-50">
            Your Forms
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage and organize all your forms.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No forms yet. Create your first form to get started.
          </p>
        </div>
      </div>
    </ProtectedLayout>
  );
}
