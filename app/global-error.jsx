"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function GlobalError({ error }) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Set isClient to true once the component has mounted on the client
    setIsClient(true);

    // Capture the error with Sentry on the client side
    if (isClient) {
      Sentry.captureException(error);
    }
  }, [error, isClient]);

  // If we are not on the client, render nothing or show a basic message
  if (!isClient) {
    return null;
  }

  // Optionally, you can customize this message or add more logic here
  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>An error occurred while loading this page. Please try again later.</p>
      <button onClick={handleBackClick}>Go to Home</button>
    </div>
  );
}
