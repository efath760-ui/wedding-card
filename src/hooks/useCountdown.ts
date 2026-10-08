import { useState, useEffect } from 'react';

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function useCountdown(targetISO: string): CountdownResult {
  const [timeLeft, setTimeLeft] = useState<CountdownResult>(() => calculateTimeLeft(targetISO));

  useEffect(() => {
    // Immediate calculation
    setTimeLeft(calculateTimeLeft(targetISO));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetISO));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetISO]);

  return timeLeft;
}

function calculateTimeLeft(targetISO: string): CountdownResult {
  const difference = new Date(targetISO).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
}
