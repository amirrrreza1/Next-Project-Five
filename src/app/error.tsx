"use client";

import { useEffect } from "react";
import { logErrorToFirebase } from "@/Lib/firebase";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    let statusCode = 500;

    if (error.name === "TypeError") {
      statusCode = 400;
    } else if (error.message.includes("Network")) {
      statusCode = 503;
    } else if (error.message.includes("Not Found")) {
      statusCode = 404;
    }

    logErrorToFirebase(error, statusCode);
  }, [error]);

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: `calc(100vh - 60px)` }}
    >
      <h1 className="text-2xl font-bold text-red-600">Something went wrong!</h1>
      <p className="text-gray-700">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
