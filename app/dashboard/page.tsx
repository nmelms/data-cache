export const revalidate = 4;

import { getUser, getPosts, getStats, getNotifications } from "./data";
import RevalidateButton from "./revalidate-button";

export default async function DashboardPage() {
  const [user, posts, stats, notifications] = await Promise.all([
    getUser(),
    getPosts(),
    getStats(),
    getNotifications(),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 p-10 font-sans dark:bg-black">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Dashboard
          </h1>
          <RevalidateButton />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card label="User">
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">{user.name}</p>
            <p className="text-xs text-zinc-500">{user.role} · #{user.id}</p>
          </Card>

          <Card label="Notifications">
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">{notifications.count} unread</p>
            <p className="text-xs text-zinc-500">at {notifications.lastChecked}</p>
          </Card>

          <Card label="Posts">
            <ul className="space-y-1">
              {posts.map((p) => (
                <li key={p.id} className="text-xs text-zinc-600 dark:text-zinc-400">
                  #{p.id} — {p.title}
                </li>
              ))}
            </ul>
          </Card>

          <Card label="Stats">
            <p className="text-xs text-zinc-600 dark:text-zinc-400">{stats.views.toLocaleString()} views</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">{stats.likes.toLocaleString()} likes</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">{stats.comments.toLocaleString()} comments</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-zinc-400">{label}</p>
      {children}
    </div>
  );
}
