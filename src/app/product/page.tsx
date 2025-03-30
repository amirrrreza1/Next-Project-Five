"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return await res.json();
};

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: products, error } = useSWR<Product[]>(
    "https://fakestoreapi.com/products",
    fetcher
  );
  const { data: categories, error: categoryError } = useSWR<string[]>(
    "https://fakestoreapi.com/products/categories",
    fetcher
  );

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll("category")
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 1000,
  ]);
  const [minRating, setMinRating] = useState<number>(
    Number(searchParams.get("minRating")) || 0
  );

  useEffect(() => {
    if (products) {
      let filtered = products;

      if (selectedCategories.length > 0) {
        filtered = filtered.filter((p) =>
          selectedCategories.includes(p.category)
        );
      }
      filtered = filtered.filter(
        (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
      );
      filtered = filtered.filter((p) => p.rating.rate >= minRating);
      setFilteredProducts(filtered);
    }
  }, [products, selectedCategories, priceRange, minRating]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("category");
    selectedCategories.forEach((cat) => params.append("category", cat));

    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    params.set("minRating", minRating.toString());

    router.replace(`?${params.toString()}`);
  }, [selectedCategories, priceRange, minRating]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  if (error || categoryError)
    return notFound();
  if (!products || !categories) return <p>Loading...</p>;

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Categories</h3>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="mr-2"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Price</h3>
          <div className="flex items-center gap-2">
            <span>Min:</span>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="border p-1 w-20"
            />
            <span>Max:</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="border p-1 w-20"
            />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Minimum Rating</h3>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="border p-2 w-full"
          >
            <option value={0}>All Ratings</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
      </div>
      <div className="w-3/4 p-4">
        <h1 className="text-xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="border p-2 rounded shadow hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain"
              />
              <h2 className="text-sm font-semibold mt-2 h-[60px] leading-[30px]">
                {product.title}
              </h2>
              <p className="text-sm my-2">{product.price} $</p>
              <p className="text-sm">
                {"★".repeat(Math.floor(product.rating.rate))}
                {"☆".repeat(5 - Math.floor(product.rating.rate))}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
