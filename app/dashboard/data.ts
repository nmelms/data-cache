import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from "next/cache";

export async function getUser() {
  "use cache";
  cacheTag("user");
  cacheLife("minutes");
  return { name: "Nick", role: "Admin", id: Math.floor(Math.random() * 1000) };
}

export async function getPosts() {
  "use cache";
  cacheTag("posts");
  cacheLife("minutes");
  return [
    { id: Math.floor(Math.random() * 1000), title: "First post" },
    { id: Math.floor(Math.random() * 1000), title: "Second post" },
    { id: Math.floor(Math.random() * 1000), title: "Third post" },
  ];
}

export async function getStats() {
  "use cache";
  cacheTag("stats");
  cacheLife("minutes");
  return {
    views: Math.floor(Math.random() * 100000),
    likes: Math.floor(Math.random() * 5000),
    comments: Math.floor(Math.random() * 500),
  };
}

export async function getNotifications() {
  "use cache";
  cacheTag("notifications");
  cacheLife("minutes");
  return {
    count: Math.floor(Math.random() * 20),
    lastChecked: new Date().toLocaleTimeString("en-US", { hour12: false }),
  };
}
