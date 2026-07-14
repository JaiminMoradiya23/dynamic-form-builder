"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { REQUIRE_AUTH } from "@/utils/authConfig";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!REQUIRE_AUTH) {
      router.replace("/dashboard");
      return;
    }

    const isAuth = localStorage.getItem("isAuthenticated");
    if (isAuth === "true") {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
    </div>
  );
}
