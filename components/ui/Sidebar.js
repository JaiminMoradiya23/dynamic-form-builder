"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg
        className="h-[18px] w-[18px]"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
        />
      </svg>
    ),
  },
  {
    label: "Forms",
    href: "/forms",
    icon: (
      <svg
        className="h-[18px] w-[18px]"
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
  },
  {
    label: "Create Form",
    href: "/forms/create",
    icon: (
      <svg
        className="h-[18px] w-[18px]"
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
    ),
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    if (href === "/forms") return pathname === "/forms";
    return pathname === href;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-[264px] flex-col border-r border-slate-100 bg-white/70 shadow-[1px_0_12px_-4px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-transform duration-300 ease-in-out dark:border-slate-800/60 dark:bg-slate-950/80 dark:shadow-[1px_0_12px_-4px_rgba(0,0,0,0.3)] lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[72px] items-center gap-3 px-7">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-md shadow-indigo-500/20">
            <svg
              className="h-[18px] w-[18px] text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
              />
            </svg>
          </div>
          <span className="text-[17px] font-semibold tracking-tight text-slate-900 dark:text-white">
            FormBuilder
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-5 pb-6 pt-6">
          <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300/80 dark:text-slate-600">
            Navigation
          </p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group relative flex items-center gap-3.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ease-in-out ${
                    active
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-50/50 shadow-sm shadow-indigo-100/50 ring-1 ring-indigo-100/60 dark:from-indigo-500/10 dark:to-indigo-500/5 dark:shadow-none dark:ring-indigo-500/10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 28,
                      }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/25 dark:bg-indigo-500/90"
                        : "bg-slate-100/80 text-slate-400 group-hover:bg-slate-200/60 group-hover:text-slate-600 dark:bg-slate-800/40 dark:text-slate-500 dark:group-hover:bg-slate-700/40 dark:group-hover:text-slate-300"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User */}
        <div className="p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 dark:bg-slate-900/50">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-[11px] font-bold text-white shadow-sm shadow-indigo-500/20">
              U
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-slate-800 dark:text-slate-200">
                User
              </p>
              <p className="truncate text-[11px] text-slate-400 dark:text-slate-500">
                user@example.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
