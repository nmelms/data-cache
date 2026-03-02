import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from "next/cache";

async function getUser() {
  "use cache";
  cacheTag("user");
  cacheLife("seconds");
  return { name: "Nick", role: "Admin", id: Math.floor(Math.random() * 1000) };
}

async function getPosts() {
  "use cache";
  cacheTag("posts");
  cacheLife("seconds");
  return [
    { id: Math.floor(Math.random() * 1000), title: "First post" },
    { id: Math.floor(Math.random() * 1000), title: "Second post" },
    { id: Math.floor(Math.random() * 1000), title: "Third post" },
  ];
}

async function getStats() {
  "use cache";
  cacheTag("stats");
  cacheLife("seconds");
  return {
    views: Math.floor(Math.random() * 100000),
    likes: Math.floor(Math.random() * 5000),
    comments: Math.floor(Math.random() * 500),
  };
}

async function getNotifications() {
  "use cache";
  cacheTag("notifications");
  cacheLife("seconds");
  return {
    count: Math.floor(Math.random() * 20),
    lastChecked: new Date().toLocaleTimeString("en-US", { hour12: false }),
  };
}

export default async function CachedData() {
  const [user, posts, stats, notifications] = await Promise.all([
    getUser(),
    getPosts(),
    getStats(),
    getNotifications(),
  ]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card label="User">
        <p className="font-semibold">{user.name}</p>
        <p className="text-xs text-zinc-500">{user.role} · #{user.id}</p>
      </Card>

      <Card label="Notifications">
        <p className="font-semibold">{notifications.count} unread</p>
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
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-zinc-400">{label}</p>
      {children}
    </div>
  );
}
