"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Banner {
  id: number;
  src: string;
  alt: string;
  href: string;
}

const banners: Banner[] = [
  { id: 1, src: "/images/banner.png", alt: "Banner 1", href: "#" },
  { id: 2, src: "/images/banner2.jpeg", alt: "Banner 2", href: "#" },
];

export function BannerCarousel() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  }, []);

  const prevBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextBanner, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, [nextBanner]);

  return (
    <div className="relative max-w-4xl mx-auto h-44 md:h-80 lg:h-96 overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentBanner ? "opacity-100" : "opacity-0"
          }`}
        >
          <a href={banner.href} target="_blank" rel="noopener noreferrer">
            <Image
              src={banner.src || "/placeholder.svg"}
              alt={banner.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </a>
        </div>
      ))}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevBanner}
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextBanner}
        aria-label="Next banner"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentBanner ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentBanner(index)}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
