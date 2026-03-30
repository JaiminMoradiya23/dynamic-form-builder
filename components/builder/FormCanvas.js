"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableFieldCard from "./SortableFieldCard";

export default function FormCanvas({
  fields,
  selectedFieldId,
  onSelectField,
  onDeleteField,
  onDuplicateField,
  onAddFirstField,
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  if (fields.length === 0) {
    return (
      <div
        ref={setNodeRef}
        className={`flex min-h-full flex-1 items-center justify-center rounded-2xl border-2 border-dashed p-8 shadow-sm transition-all duration-300 ${
          isOver
            ? "border-indigo-400 bg-indigo-50/50 dark:border-indigo-500 dark:bg-indigo-500/5"
            : "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="text-center"
        >
          <div className="relative mx-auto mb-6 h-24 w-32">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-2 top-0 h-12 w-20 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-500/20 dark:bg-blue-500/10"
            />
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
              className="absolute bottom-2 left-6 h-10 w-20 rounded-lg border border-purple-200 bg-purple-50 dark:border-purple-500/20 dark:bg-purple-500/10"
            />
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
              className="absolute right-0 top-4 h-11 w-20 rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10"
            />
          </div>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            Start building your form
          </h3>
          <p className="mx-auto mt-2 max-w-xs text-sm text-slate-400 dark:text-slate-500">
            {isOver
              ? "Drop here to add the field"
              : "Drag fields from the library or click to add"}
          </p>

          {!isOver && onAddFirstField && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onAddFirstField}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-indigo-600 hover:shadow-md"
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
              Add your first field
            </motion.button>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 overflow-y-auto rounded-2xl border-2 p-6 shadow-sm transition-all duration-300 ${
        isOver
          ? "border-indigo-400 bg-indigo-50/30 dark:border-indigo-500 dark:bg-indigo-500/5"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      }`}
    >
      <SortableContext
        items={fields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-wrap gap-3">
          <AnimatePresence mode="popLayout">
            {fields.map((field) => (
              <SortableFieldCard
                key={field.id}
                field={field}
                isSelected={selectedFieldId === field.id}
                onSelect={onSelectField}
                onDelete={onDeleteField}
                onDuplicate={onDuplicateField}
              />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </div>
  );
}
