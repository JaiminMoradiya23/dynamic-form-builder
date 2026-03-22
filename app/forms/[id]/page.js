"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ProtectedLayout from "@/components/ui/ProtectedLayout";
import { getFormById } from "@/utils/storageHelpers";

export default function FormBuilderPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loaded = getFormById(id);
    if (loaded) {
      setForm(loaded);
    } else {
      setNotFound(true);
    }
  }, [id]);

  if (notFound) {
    return (
      <ProtectedLayout>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10">
            <svg
              className="h-7 w-7 text-red-500 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            Form not found
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-400 dark:text-slate-500">
            The form you&apos;re looking for doesn&apos;t exist or has been
            deleted.
          </p>
          <button
            onClick={() => router.push("/forms")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600"
          >
            Back to Forms
          </button>
        </motion.div>
      </ProtectedLayout>
    );
  }

  if (!form) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {form.name}
            </h2>
            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
              {form.fields.length}{" "}
              {form.fields.length === 1 ? "field" : "fields"} &middot; Drag and
              drop builder coming soon
            </p>
          </div>
          <button
            onClick={() => router.push("/forms")}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            Back to Forms
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <svg
              className="h-7 w-7 text-slate-400 dark:text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            Builder coming soon
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-400 dark:text-slate-500">
            The drag-and-drop form builder will be available here. You&apos;ll
            be able to add fields, reorder them, and configure settings.
          </p>
        </motion.div>
      </div>
    </ProtectedLayout>
  );
}
