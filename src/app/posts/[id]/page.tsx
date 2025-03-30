"use client";

import { notFound, useParams } from "next/navigation";
import useSWR from "swr";

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetcher = async (url: string, method = "GET") => {
  const timestamp = new Date().toISOString();

  try {
    const res = await fetch(url);
    const success = res.ok;

    await fetch("/api/logApi", {
      method: "POST",
      body: JSON.stringify({ endpoint: url, method, success, timestamp }),
      headers: { "Content-Type": "application/json" },
    });

    if (!success) throw new Error(`Failed to fetch: ${res.statusText}`);
    return res.json();
  } catch (err: any) {
    throw err;
  }
};

const ShowPost = () => {
  const { id } = useParams();
  const postId = id;

  const { data: post, error } = useSWR<Post>(
    postId ? `https://jsonplaceholder.typicode.com/posts/${postId}` : null,
    fetcher
  );

  if (error) return notFound();
  if (!post) return <p className="LoadingScreen">Loading...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>
      <p className="text-gray-500">{post.body}</p>
    </div>
  );
};

export default ShowPost;
