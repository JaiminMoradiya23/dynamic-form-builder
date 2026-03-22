"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedLayout from "@/components/ui/ProtectedLayout";
import FormCard from "@/components/forms/FormCard";
import {
  getForms,
  deleteForm,
  duplicateForm,
} from "@/utils/storageHelpers";

export default function FormsPage() {
  const router = useRouter();
  const [forms, setForms] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setForms(getForms());
    setLoaded(true);
  }, []);

  const handleDelete = useCallback((formId) => {
    const remaining = deleteForm(formId);
    setForms(remaining);
  }, []);

  const handleDuplicate = useCallback((formId) => {
    duplicateForm(formId);
    setForms(getForms());
  }, []);

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              {forms.length} {forms.length === 1 ? "form" : "forms"} total
            </p>
          </div>
          <button
            onClick={() => router.push("/forms/create")}
            className="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            New Form
          </button>
        </div>

        {/* Content */}
        {loaded && forms.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              No forms created yet
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-400 dark:text-slate-500">
              Create your first form to get started. You can build, preview, and
              export forms with ease.
            </p>
            <button
              onClick={() => router.push("/forms/create")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Create Form
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {forms.map((form, i) => (
                <FormCard
                  key={form.id}
                  form={form}
                  index={i}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
}
