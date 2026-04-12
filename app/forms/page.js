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
import { Button } from "@headlessui/react";

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
          <Button
            type="button"
            onClick={() => router.push("/forms/create")}
            className="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white cursor-pointer transition-all duration-200 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
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
          </Button>
        </div>

        {/* Content */}
        {loaded && forms.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="relative mx-auto mb-6 h-20 w-28">
              <motion.div
                animate={{ y: [0, -4, 0], rotate: [-2, 0, -2] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 top-0 h-14 w-18 rounded-xl border border-indigo-200 bg-indigo-50 shadow-sm dark:border-indigo-500/20 dark:bg-indigo-500/10"
              />
              <motion.div
                animate={{ y: [0, -3, 0], rotate: [1, 0, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute bottom-0 right-0 h-14 w-18 rounded-xl border border-emerald-200 bg-emerald-50 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md dark:bg-slate-800"
              >
                <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </motion.div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              No forms yet
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-400 dark:text-slate-500">
              Create your first form to get started. Build with drag & drop,
              preview in real-time, and export as JSON.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/forms/create")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-indigo-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create Your First Form
            </motion.button>
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
