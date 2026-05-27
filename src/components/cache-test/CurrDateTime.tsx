"use client";

import { useEffect, useState } from "react";

export default function CurrDateTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime(new Date().toLocaleString());
  }, []);

  return <>{time}</>;
}