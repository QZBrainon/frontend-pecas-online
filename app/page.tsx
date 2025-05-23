"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { Suspense, use, useEffect, useState } from "react";
import { TableSkeleton } from "@/components/application/SkeletonTable";
import ProductTable from "@/components/application/ProductTable";
import { Product } from "@/components/application/ProductTable";
import { PaginationControls } from "@/components/application/PaginationControls";
import "./globals.css";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

export default function Home() {
  const [code, setCode] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [bannerSrc, setBannerSrc] = useState<string>("");
  const [additionalBanners, setAdditionalBanners] = useState<string[]>([]);
  const [showVideo, setShowVideo] = useState(false);
  const [isShortScreen, setIsShortScreen] = useState(false);

  // Check if the screen is shorter than 1080px
  useEffect(() => {
    const checkScreenHeight = () => {
      setIsShortScreen(window.innerHeight < 1080);
    };

    // Initial check
    checkScreenHeight();

    // Add listener for resize events
    window.addEventListener("resize", checkScreenHeight);

    return () => window.removeEventListener("resize", checkScreenHeight);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);

      setTimeout(() => {
        const video = document.getElementById(
          "popup-video"
        ) as HTMLVideoElement;
        video?.play();
      }, 100);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const fetchData = async (code: string, page: number) => {
    setLoading(true);

    try {
      // Convert code to uppercase to make search case-insensitive
      const uppercaseCode = code.toUpperCase();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/estoque/codigo/${uppercaseCode}?page=${page}&size=10`
      );

      const data = await res.json();

      setProducts(data.content);
      setTotalPages(data.totalPages);

      if (currentPage > data.totalPages) {
        setCurrentPage(0);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to shuffle an array (Fisher-Yates algorithm)
  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const fetchBanner = async () => {
    try {
      // Fetch main banner from the original endpoint
      const mainBannerRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/banner`);
      const mainBannerUrl = await mainBannerRes.text();

      // Set the main banner
      setBannerSrc(mainBannerUrl);

      // Fetch rotating banners from the new endpoint
      const rotatingBannersRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/banner/all`);
      const rotatingBanners = await rotatingBannersRes.json();

      console.log("Fetched rotating banners:", rotatingBanners);

      // Randomize the rotating banners for the marquee
      if (rotatingBanners && rotatingBanners.length > 0) {
        setAdditionalBanners(shuffleArray(rotatingBanners));
      } else {
        setAdditionalBanners([]);
      }
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  };

  useEffect(() => {
    if (!code) {
      setProducts([]);
      setTotalPages(0);
      return;
    }
    fetchData(code, currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchBanner();
    const interval = setInterval(() => {
      fetchBanner();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Main Banner */}
        {bannerSrc ? (
          <div className="relative w-full max-w-4xl mx-auto mt-4">
            <img
              src={bannerSrc}
              alt="Banner promocional principal"
              className={clsx("w-full h-auto object-contain mx-auto", {
                "max-h-[140px]": isShortScreen,
                "max-h-[200px]": !isShortScreen,
              })}
            />
          </div>
        ) : (
          <Skeleton
            className={clsx("relative max-w-4xl aspect-[3/1] mx-auto mt-4", {
              "max-h-[140px]": isShortScreen,
              "max-h-[200px]": !isShortScreen,
            })}
          />
        )}

        {/* Marquee Banner */}
        {additionalBanners.length > 0 && (
          <div className="w-full max-w-4xl mx-auto mt-2 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {additionalBanners.map((banner, index) => (
                <img
                  key={index}
                  src={banner}
                  alt={`Banner promocional ${index + 2}`}
                  className={clsx("h-auto object-contain mx-2", {
                    "max-h-[60px]": isShortScreen,
                    "max-h-[80px]": !isShortScreen,
                  })}
                />
              ))}
            </div>
          </div>
        )}

        <section
          className={clsx("w-full container mx-auto", {
            "py-6 md:py-8": isShortScreen,
            "py-12 md:py-24 lg:py-20": !isShortScreen,
          })}
        >
          <div className="container px-4 md:px-6">
            <div
              className={clsx(
                "flex flex-col items-center space-y-4 text-center",
                {
                  "space-y-3": isShortScreen,
                  "space-y-6": !isShortScreen,
                }
              )}
            >
              <div
                className={clsx({
                  "space-y-3": isShortScreen,
                  "space-y-6": !isShortScreen,
                })}
              >
                <h1
                  className={clsx("font-bold tracking-tighter", {
                    "text-2xl sm:text-3xl md:text-4xl": isShortScreen,
                    "text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none":
                      !isShortScreen,
                  })}
                >
                  Encontre todas as peças que precisa em um só lugar
                </h1>
                <p
                  className={clsx(
                    "mx-auto max-w-[700px] text-gray-500 dark:text-gray-400",
                    {
                      "text-sm md:text-base md:mt-3": isShortScreen,
                      "md:text-xl md:mt-6": !isShortScreen,
                    }
                  )}
                >
                  Digite os códigos das peças e encontre os melhores
                  fornecedores do mercado
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form
                  className="flex space-x-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    fetchData(code, currentPage);
                  }}
                >
                  <Input
                    className="flex-1"
                    placeholder="Digite os códigos das peças"
                    type="search"
                    value={code}
                    onChange={handleSearch}
                  />
                  <Button type="submit">Pesquisar</Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container mx-auto px-4 md:px-6">
            {loading ? <TableSkeleton /> : <ProductTable products={products} />}
            <div className="flex container mx-auto">
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
