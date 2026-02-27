"use client";

import { useTransition } from "react";
import { revalidateDashboard } from "./actions";

export default function RevalidateButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => revalidateDashboard())}
      disabled={isPending}
      className="h-9 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      {isPending ? "Revalidating…" : "Revalidate cache"}
    </button>
  );
}
