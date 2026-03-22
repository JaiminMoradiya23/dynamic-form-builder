"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
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

        {/* Quick Action + Recent */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Create */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white">
              Quick Actions
            </h3>
            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
              Jump right in and start building.
            </p>
            <button
              onClick={() => router.push("/forms/create")}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600"
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
              Create New Form
            </button>
            <button
              onClick={() => router.push("/forms")}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              View All Forms
            </button>
          </motion.div>

          {/* Recent Forms */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2"
          >
            <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white">
              Recent Forms
            </h3>
            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
              Your latest forms at a glance.
            </p>

            {recentForms.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-slate-200 py-8 text-center dark:border-slate-700">
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  No forms yet. Create one to get started.
                </p>
              </div>
            ) : (
              <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                {recentForms.map((form) => (
                  <button
                    key={form.id}
                    onClick={() => router.push(`/forms/${form.id}`)}
                    className="flex w-full items-center justify-between py-3 text-left transition-all duration-200 first:pt-0 last:pb-0 hover:opacity-80"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                        {form.name}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {form.fields.length}{" "}
                        {form.fields.length === 1 ? "field" : "fields"}{" "}
                        &middot; {formatDate(form.updatedAt)}
                      </p>
                    </div>
                    <svg
                      className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
