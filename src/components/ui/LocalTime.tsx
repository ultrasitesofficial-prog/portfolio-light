"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/** Live studio clock — a small proof that the site is alive and handmade. */
export default function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState("––:––:––");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: site.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className={className} suppressHydrationWarning>
      {time}
    </time>
  );
}
