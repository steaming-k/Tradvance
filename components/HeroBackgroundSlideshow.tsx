"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGES = ["/hero-1.png", "/hero-2.png"];
const INTERVAL_MS = 6000;

export function HeroBackgroundSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute -inset-x-[5%] -inset-y-[12%] animate-hero-pan">
            <Image
              src={src}
              alt=""
              fill
              priority={index === 0}
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
