"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Field, Label, Input, Button } from "@headlessui/react";

const INPUT_CLASS =
  "w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 data-[focus]:ring-2 data-[hover]:border-slate-300 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500 dark:data-[hover]:border-slate-600 border-slate-200 data-[focus]:border-indigo-500 data-[focus]:ring-indigo-500/20 dark:border-slate-700 dark:data-[focus]:border-indigo-500 data-[invalid]:border-red-400 data-[invalid]:data-[focus]:border-red-400 data-[invalid]:data-[focus]:ring-red-500/20 dark:data-[invalid]:border-red-500";

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
    <div className="flex min-h-full w-full overflow-y-auto items-center justify-center bg-slate-50 dark:bg-slate-950">
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
            <Field className="space-y-1.5">
              <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email
              </Label>
              <Input
                type="text"
                autoComplete="email"
                placeholder="you@example.com"
                invalid={!!errors.email}
                className={INPUT_CLASS}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </Field>

            <Field className="space-y-1.5">
              <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </Label>
              <Input
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                invalid={!!errors.password}
                className={INPUT_CLASS}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </Field>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white transition-all duration-200 data-[hover]:bg-indigo-600 data-[focus]:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500/50 data-[focus]:ring-offset-2 data-[disabled]:opacity-50 dark:data-[focus]:ring-offset-slate-900"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
