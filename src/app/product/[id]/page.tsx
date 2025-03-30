"use client";

import useSWR from "swr";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { use } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
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

const ProductPage = ({ params }: { params: Promise<{ id?: string }> }) => {
  const { id } = use(params);

  if (!id) return notFound();

  const { data: product, error } = useSWR<Product>(
    `https://fakestoreapi.com/products/${id}`,
    fetcher
  );
  useEffect(() => {}, [error]);

  if (error) return notFound();
  if (!product) return <p className="LoadingScreen">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row gap-6">
      <img
        src={product.image}
        alt={product.title}
        className="w-[350px] h-auto object-contain border p-4 rounded-lg shadow-sm"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {product.title}
        </h1>
        <p className="text-gray-500 text-sm mb-4">
          Category: {product.category}
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          {product.description}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-xl font-semibold text-green-600">
            ${product.price}
          </span>
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm font-bold">
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
