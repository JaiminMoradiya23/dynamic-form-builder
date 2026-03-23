"use client";

import { motion } from "framer-motion";
import { FIELD_TYPES, getFieldColor } from "@/utils/fieldConfig";

export default function FieldLibrary({ onAddField }) {
  return (
    <div className="flex h-full w-[250px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Field Library
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Click to add to your form
        </p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {FIELD_TYPES.map((field, index) => {
          const colors = getFieldColor(field.type);
          return (
            <motion.button
              key={field.type}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAddField(field.type)}
              className={`group flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:shadow-md ${colors.hoverBg} ${colors.hoverBorder} dark:border-slate-800 dark:bg-slate-800/60`}
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
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
