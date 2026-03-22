import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Dynamic Form Builder</h1>
      <p className="text-lg text-zinc-500">Build forms with drag & drop</p>
      <Link
        href="/dashboard"
        className="rounded-lg bg-zinc-900 px-6 py-3 text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
