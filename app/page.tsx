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

export default function Home() {
  const [code, setCode] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [bannerSrc, setBannerSrc] = useState<string>("");
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

    // Clean up
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/estoque/codigo/${code}?page=${page}&size=10`
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

  const fetchBanner = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/banner`);
      const bannerUrl = await res.text();

      console.log("Fetched banner URL:", bannerUrl);

      setBannerSrc(bannerUrl);
    } catch (error) {
      console.error("Failed to fetch banner:", error);
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
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
          <div className="relative w-full max-w-3xl px-4">
            <button
              onClick={() => {
                const video = document.getElementById(
                  "popup-video"
                ) as HTMLVideoElement;
                video.pause();
                video.currentTime = 0;
                setShowVideo(false);
              }}
              className="absolute top-3 right-8 text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 z-50"
            >
              Fechar
            </button>

            <video
              id="popup-video"
              controls
              className="w-full rounded-lg shadow-lg"
              autoPlay
            >
              <source
                src="https://backend.pecasonlinex.com.br/uploads/pecas-online-pv.mp4"
                type="video/mp4"
              />
              Seu navegador não suporta vídeo.
            </video>
          </div>
        </div>
      )}

      <main className="flex-1">
        {bannerSrc ? (
          <div className="relative w-full max-w-4xl mx-auto mt-4">
            <img
              src={bannerSrc}
              alt="Banner promocional"
              className={`w-full h-auto object-contain mx-auto ${
                isShortScreen ? "max-h-[140px]" : "max-h-[200px]"
              }`}
            />
          </div>
        ) : (
          <Skeleton
            className={`relative max-w-4xl aspect-[3/1] mx-auto mt-4 ${
              isShortScreen ? "max-h-[140px]" : ""
            }`}
          />
        )}

        <section
          className={`w-full container mx-auto ${
            isShortScreen ? "py-6 md:py-8" : "py-12 md:py-24 lg:py-20"
          }`}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className={`space-y-${isShortScreen ? "3" : "6"}`}>
                <h1
                  className={`font-bold tracking-tighter ${
                    isShortScreen
                      ? "text-2xl sm:text-3xl md:text-4xl"
                      : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none"
                  }`}
                >
                  Encontre todas as peças que precisa em um só lugar
                </h1>
                <p
                  className={`mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 ${
                    isShortScreen
                      ? "text-sm md:text-base md:mt-3"
                      : "md:text-xl md:mt-6"
                  }`}
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
