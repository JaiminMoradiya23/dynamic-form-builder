"use client";

import ProtectedLayout from "@/components/ui/ProtectedLayout";

export default function FormsPage() {
  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No forms yet. Create your first form to get started.
          </p>
        </div>
      </div>
    </ProtectedLayout>
  );
}
