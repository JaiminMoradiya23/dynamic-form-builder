"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getFieldColor, getFieldMeta } from "@/utils/fieldConfig";

const WIDTH_LABELS = { 100: "Full", 50: "Half", 33: "1/3" };

export default function FieldCard({
  field,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
}) {
  const colors = getFieldColor(field.type);
  const meta = getFieldMeta(field.type);
  const [isHovered, setIsHovered] = useState(false);
  const width = field.layout?.width || 100;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -6 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.25 }}
      onClick={() => onSelect(field.id)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group flex cursor-pointer items-center gap-3 rounded-xl border p-4 shadow-sm transition-all duration-200 ${
        isHovered ? "shadow-md" : ""
      } ${
        isSelected
          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
          : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
      }`}
    >
      {/* Drag handle indicator */}
      <div className="flex shrink-0 flex-col gap-[3px] opacity-40 transition-opacity duration-200 group-hover:opacity-70">
        <div className="flex gap-[3px]">
          <span className="h-1 w-1 rounded-full bg-slate-400" />
          <span className="h-1 w-1 rounded-full bg-slate-400" />
        </div>
        <div className="flex gap-[3px]">
          <span className="h-1 w-1 rounded-full bg-slate-400" />
          <span className="h-1 w-1 rounded-full bg-slate-400" />
        </div>
        <div className="flex gap-[3px]">
          <span className="h-1 w-1 rounded-full bg-slate-400" />
          <span className="h-1 w-1 rounded-full bg-slate-400" />
        </div>
      </div>

      {/* Color Bar */}
      <div className={`w-1 self-stretch rounded-full ${colors.accent}`} />

      {/* Icon */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.iconBg} ${colors.text}`}
      >
        {meta.icon}
      </div>

      {/* Content */}
      <div className="ml-0.5 min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-semibold text-slate-900 dark:text-white">
            {field.label}
          </span>
          {field.required && (
            <span className="shrink-0 rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-500 dark:bg-red-500/15 dark:text-red-400">
              Required
            </span>
          )}
        </div>
        <div className="mt-0.5 flex items-center gap-2">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {meta.label}
          </span>
          {width !== 100 && (
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400">
              {WIDTH_LABELS[width] || `${width}%`}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div
        className={`flex shrink-0 items-center gap-1 transition-all duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(field.id);
          }}
          className="rounded-lg p-1.5 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-indigo-500 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
          title="Edit field"
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate?.(field.id);
          }}
          className="rounded-lg p-1.5 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-emerald-500 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
          title="Duplicate field"
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
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
            />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(field.id);
          }}
          className="rounded-lg p-1.5 text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          title="Delete field"
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
