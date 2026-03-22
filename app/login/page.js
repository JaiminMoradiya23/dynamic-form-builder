"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      router.replace("/dashboard");
    }
  }, [router]);

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      setError("Please fill in all fields");
      return;
    }
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userCredentials", JSON.stringify({
      email: data.email,
      password: data.password
    }));
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              Welcome back 
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Sign in to your FormBuilder account
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-center text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                type="text"
                autoComplete="email"
                placeholder="you@example.com"
                className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:ring-2 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500 ${
                  errors.email
                    ? "border-red-400 focus:border-red-400 focus:ring-red-500/20 dark:border-red-500"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700 dark:focus:border-indigo-500"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:ring-2 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500 ${
                  errors.password
                    ? "border-red-400 focus:border-red-400 focus:ring-red-500/20 dark:border-red-500"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700 dark:focus:border-indigo-500"
                }`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-slate-900"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
