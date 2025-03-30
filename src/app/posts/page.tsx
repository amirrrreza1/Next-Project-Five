"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (url: string) => {
  const res = await fetch(url);
  const data: Post[] = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return data;
};

const PostsPage = () => {
  const { data: posts, error } = useSWR<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    fetchPosts
  );

  if (error) return notFound();
  if (!posts) return <p className="LoadingScreen">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            href={`/posts/${post.id}`}
            key={post.id}
            className="border p-4 rounded shadow hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-600">
              {post.body.slice(0, 100)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
