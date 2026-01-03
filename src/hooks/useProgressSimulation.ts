'use client';

import { useEffect, useState } from 'react';

export function useProgressSimulation(initialProgress: number, status: string) {
  const [progress, setProgress] = useState(initialProgress);

  useEffect(() => {
    if (status !== 'processing') return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment between 1-5%
        const increment = Math.floor(Math.random() * 5) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [status]);

  return progress;
}