"use client";

import { motion, AnimatePresence } from "framer-motion";
import FieldCard from "./FieldCard";

export default function FormCanvas({
  fields,
  selectedFieldId,
  onSelectField,
  onDeleteField,
}) {
  if (fields.length === 0) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <svg
              className="h-8 w-8 text-slate-400 dark:text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            Start building your form
          </h3>
          <p className="mx-auto mt-2 max-w-xs text-sm text-slate-400 dark:text-slate-500">
            Start building your form by adding fields from the library on the
            left
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {fields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
              isSelected={selectedFieldId === field.id}
              onSelect={onSelectField}
              onDelete={onDeleteField}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
