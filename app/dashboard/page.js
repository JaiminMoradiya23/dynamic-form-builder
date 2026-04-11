"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Description } from "@headlessui/react";
import ProtectedLayout from "@/components/ui/ProtectedLayout";
import { getForms, formatDate } from "@/utils/storageHelpers";

export default function DashboardPage() {
  const router = useRouter();
  const [forms, setForms] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setForms(getForms());
    setLoaded(true);
  }, []);

  const totalFields = forms.reduce((sum, f) => sum + f.fields.length, 0);
  const lastEdited = forms.length
    ? forms.reduce((a, b) => (a.updatedAt > b.updatedAt ? a : b))
    : null;
  const recentForms = forms.slice(0, 5);

  const stats = [
    {
      label: "Total Forms",
      value: loaded ? forms.length : "—",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      ),
      color: "indigo",
    },
    {
      label: "Total Fields",
      value: loaded ? totalFields : "—",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
          />
        </svg>
      ),
      color: "emerald",
    },
    {
      label: "Last Edited",
      value:
        loaded && lastEdited ? formatDate(lastEdited.updatedAt) : "—",
      subtitle: lastEdited ? lastEdited.name : null,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
      color: "amber",
    },
  ];

  const colorMap = {
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
      text: "text-indigo-500 dark:text-indigo-400",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      text: "text-emerald-500 dark:text-emerald-400",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-500/10",
      text: "text-amber-500 dark:text-amber-400",
    },
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  {stat.label}
                </p>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${colorMap[stat.color].bg} ${colorMap[stat.color].text}`}
                >
                  {stat.icon}
                </div>
              </div>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                {stat.value}
              </p>
              {stat.subtitle && (
                <p className="mt-0.5 truncate text-sm text-slate-400 dark:text-slate-500">
                  {stat.subtitle}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Forms: one panel — toolbar + recent list */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
          aria-labelledby="forms-workspace-heading"
        >
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 dark:border-slate-800">
            <div className="min-w-0">
              <h2
                id="forms-workspace-heading"
                className="text-sm font-semibold text-slate-900 dark:text-white"
              >
                Forms
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                New form or open one you edited recently
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Button
                type="button"
                onClick={() => router.push("/forms/create")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-medium text-white transition-colors data-hover:bg-indigo-600 data-focus:outline-none data-focus:ring-2 data-focus:ring-indigo-500/50 data-focus:ring-offset-2 dark:data-focus:ring-offset-slate-900 sm:text-sm sm:px-3.5"
              >
                <svg
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                New form
              </Button>
              <Button
                type="button"
                onClick={() => router.push("/forms")}
                className="inline-flex items-center rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-xs font-medium text-slate-600 transition-colors data-hover:bg-slate-50 data-focus:outline-none data-focus:ring-2 data-focus:ring-slate-400/25 data-focus:ring-offset-2 dark:border-slate-600 dark:text-slate-300 dark:data-hover:bg-slate-800 dark:data-focus:ring-offset-slate-900 sm:text-sm"
              >
                All forms
              </Button>
            </div>
          </div>

          <div
            className="px-5 py-4"
            role="group"
            aria-labelledby="dashboard-recent-heading"
          >
            <div className="flex items-center justify-between gap-3">
              <h3
                id="dashboard-recent-heading"
                className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500"
              >
                Recently edited
              </h3>
              {recentForms.length > 0 && (
                <Button
                  type="button"
                  onClick={() => router.push("/forms")}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition-colors data-hover:bg-slate-100 data-hover:text-slate-800 data-focus:outline-none data-focus:ring-2 data-focus:ring-indigo-500/25 dark:text-slate-400 dark:data-hover:bg-slate-800 dark:data-hover:text-slate-100"
                >
                  View all
                  <svg
                    className="h-3 w-3 opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Button>
              )}
            </div>

            {recentForms.length === 0 ? (
              <Description className="mt-4 rounded-xl border border-dashed border-slate-200/90 bg-slate-50/50 px-4 py-9 text-center text-sm leading-relaxed text-slate-500 dark:border-slate-700 dark:bg-slate-800/30 dark:text-slate-400">
                No forms yet. Use{" "}
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  New form
                </span>{" "}
                above to get started.
              </Description>
            ) : (
              <ul className="mt-3 space-y-1" role="list">
                {recentForms.map((form) => (
                  <li key={form.id}>
                    <Button
                      type="button"
                      onClick={() => router.push(`/forms/${form.id}`)}
                      className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition-all duration-200 cursor-pointer data-hover:border-slate-200/80 data-hover:bg-slate-50 data-focus:outline-none data-focus:ring-2 data-focus:ring-indigo-500/25 dark:data-hover:border-slate-700/80 dark:data-hover:bg-slate-800/60 dark:data-focus:ring-indigo-400/20"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium tracking-tight text-slate-900 dark:text-slate-100">
                          {form.name}
                        </p>
                        <p className="mt-0.5 text-xs tabular-nums tracking-tight text-slate-500 dark:text-slate-400">
                          {form.fields.length}{" "}
                          {form.fields.length === 1 ? "field" : "fields"}
                          <span
                            className="mx-1.5 text-slate-300 dark:text-slate-600"
                            aria-hidden
                          >
                            ·
                          </span>
                          {formatDate(form.updatedAt)}
                        </p>
                      </div>
                      <svg
                        className="h-4 w-4 shrink-0 text-slate-300 transition-colors duration-200 group-hover:text-slate-500 dark:text-slate-600 dark:group-hover:text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.75}
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.section>
      </div>
    </ProtectedLayout>
  );
}
