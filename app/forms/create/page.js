"use client";

import ProtectedLayout from "@/components/ui/ProtectedLayout";

export default function CreateFormPage() {
  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Form builder will be available here.
          </p>
        </div>
      </div>
    </ProtectedLayout>
  );
}
