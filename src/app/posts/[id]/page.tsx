"use client";

import { notFound, useParams } from "next/navigation";
import useSWR from "swr";

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data: Post = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return data;
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
