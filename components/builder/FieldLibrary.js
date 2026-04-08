"use client";

import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import { FIELD_TYPES, getFieldColor } from "@/utils/fieldConfig";

function DraggableFieldItem({ field, index, onAddField }) {
  const colors = getFieldColor(field.type);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${field.type}`,
    data: { type: field.type, source: "library" },
  });

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className={isDragging ? "opacity-50" : ""}
    >
      <button
        {...listeners}
        {...attributes}
        onClick={() => onAddField(field.type)}
        className={`group flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${colors.hoverBg} ${colors.hoverBorder} dark:border-slate-800 dark:bg-slate-800/60`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colors.bg} ${colors.text} transition-all duration-200`}
        >
          {field.icon}
        </span>
        <div className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-slate-800 dark:text-slate-200">
            {field.label}
          </span>
          <span className="block truncate text-[11px] text-slate-400 dark:text-slate-500">
            {field.description}
          </span>
        </div>
        <svg
          className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:text-slate-400 dark:text-slate-600 dark:group-hover:text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </button>
    </motion.div>
  );
}

export default function FieldLibrary({ onAddField }) {
  return (
    <div className="flex h-full w-[250px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Field Library
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Drag or click to add fields
        </p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {FIELD_TYPES.map((field, index) => (
          <DraggableFieldItem
            key={field.type}
            field={field}
            index={index}
            onAddField={onAddField}
          />
        ))}
      </div>
    </div>
  );
}
