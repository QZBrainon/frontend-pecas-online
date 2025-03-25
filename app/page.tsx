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
    <div className="flex flex-col max-h-screen">
      <main className="flex-1">
        {bannerSrc ? (
          <div className="relative w-full max-w-4xl mx-auto mt-4">
            <img
              src={bannerSrc}
              alt="Banner promocional"
              className="w-full h-auto max-h-[200px] object-contain mx-auto"
            />
          </div>
        ) : (
          <Skeleton className="relative max-w-4xl aspect-[3/1] mx-auto mt-4" />
        )}
        <section className="w-full py-12 md:py-24 lg:py-20 container mx-auto">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Encontre todas as peças que precisa em um só lugar
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 md:mt-6">
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
                  <Button type="submit">
                    Pesquisar
                  </Button>
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
