"use client";

import { useParams } from "next/navigation";
import ProtectedLayout from "@/components/ui/ProtectedLayout";

export default function FormBuilderPage() {
  const { id } = useParams();

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-slate-900 dark:text-slate-50">
            Form Builder
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Editing form: {id}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Drag and drop builder will be available here.
          </p>
        </div>
      </div>
    </ProtectedLayout>
  );
}
