"use client";

import { getFieldColor, getFieldMeta } from "@/utils/fieldConfig";

export default function DragOverlayCard({ type, label }) {
  const colors = getFieldColor(type);
  const meta = getFieldMeta(type);

  return (
    <div className="flex w-[400px] items-center gap-3 rounded-xl border-2 border-indigo-400 bg-white p-4 shadow-xl dark:border-indigo-500 dark:bg-slate-800">
      <div className={`w-1 self-stretch rounded-full ${colors.accent}`} />
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.iconBg} ${colors.text}`}
      >
        {meta.icon}
      </div>
      <div className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-900 dark:text-white">
          {label || meta.label}
        </span>
        <span className="block text-xs text-slate-400 dark:text-slate-500">
          {meta.label}
        </span>
      </div>
    </div>
  );
}
