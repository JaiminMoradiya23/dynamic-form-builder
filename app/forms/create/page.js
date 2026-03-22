"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import ProtectedLayout from "@/components/ui/ProtectedLayout";
import { createForm } from "@/utils/storageHelpers";

export default function CreateFormPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "" } });

  const onSubmit = (data) => {
    setIsCreating(true);
    const form = createForm({ name: data.name });
    router.push(`/forms/${form.id}`);
  };

  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10">
              <svg
                className="h-5 w-5 text-indigo-500 dark:text-indigo-400"
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
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Create a new form
            </h2>
            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
              Give your form a name to get started. You can add fields in the
              builder.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="formName"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Form Name
              </label>
              <input
                id="formName"
                type="text"
                autoFocus
                placeholder="e.g. Contact Form, Survey, Feedback..."
                className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:ring-2 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500 ${
                  errors.name
                    ? "border-red-400 focus:border-red-400 focus:ring-red-500/20 dark:border-red-500"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700 dark:focus:border-indigo-500"
                }`}
                {...register("name", {
                  required: "Form name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Name must be under 100 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isCreating}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-slate-900"
              >
                {isCreating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating...
                  </>
                ) : (
                  <>
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
                    Create Form
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push("/forms")}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </ProtectedLayout>
  );
}
