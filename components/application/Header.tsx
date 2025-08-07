"use client";
import { Menu, Upload, Wrench, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import FileUpload from "./FileUpload";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import DarkModeToggle from "./DarkModeToggle";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState<string | null>(null);
  const [loadingToken, setLoadingToken] = React.useState(true);
  useEffect(() => {
    setLoadingToken(true);
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      setLoadingToken(false);
    }
  }, [token]);
  return (
    <header className="flex items-center container mx-auto px-4">
      <Link className="flex items-center justify-center" href="/">
        <Image
          src="/images/logo-white.png"
          alt="Peças Por Código"
          width={160}
          height={40}
          className="object-contain dark:block hidden"
        />
        <span className="sr-only">Logo</span>
      </Link>
      <Link className="flex items-center justify-center" href="/">
        <Image
          src="/images/logo-black.png"
          alt="Peças Por Código"
          width={160}
          height={40}
          className="object-contain dark:hidden block"
        />
        <span className="sr-only">Logo</span>
      </Link>
      <nav className="ml-auto gap-4 sm:gap-6 items-center hidden md:flex">
        <Link className="text-md hover:underline underline-offset-4" href="/">
          Início
        </Link>
        <Link
          className="text-md hover:underline underline-offset-4"
          href="/pricing"
        >
          Planos
        </Link>
        <Link
          className="text-md hover:underline underline-offset-4"
          href="/about"
        >
          Sobre
        </Link>
        <Link
          className="text-md hover:underline underline-offset-4"
          href="/contact"
        >
          Contato
        </Link>
        <Link
          className="text-md hover:underline underline-offset-4"
          href="/a-curve"
        >
          Curva A
        </Link>
      </nav>
      <div className="ml-auto items-center gap-2 hidden md:flex">
        <DarkModeToggle />
        {loadingToken ? (
          <Skeleton className="w-[80px] h-[32px]" />
        ) : token ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <FileUpload token={token} setToken={setToken} />
            </DialogContent>
          </Dialog>
        ) : (
          <Link href="/login">
            <Button variant="outline" size="sm" className="px-4">
              Login
            </Button>
          </Link>
        )}
        <Link href={"/signup"}>
          <Button variant="default" size="sm">
            Inscreva-se
          </Button>
        </Link>
      </div>
      {/* hamburger menu */}
      <div className="ml-auto flex items-center justify-center gap-2 md:hidden relative">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Menu className="h-6 w-6" />
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex items-center justify-between absolute top-0 right-0 p-4">
              <DrawerClose asChild>
                <X className="h-6 w-6" />
              </DrawerClose>
            </div>
            <nav className="flex flex-col gap-4 sm:gap-6 items-center justify-center mt-4 pb-6">
              <Link
                className="text-md hover:underline underline-offset-4"
                href="/"
              >
                Início
              </Link>
              <Link
                className="text-md hover:underline underline-offset-4"
                href={"/pricing"}
              >
                Planos
              </Link>
              <Link
                className="text-md hover:underline underline-offset-4"
                href="/about"
              >
                Sobre
              </Link>
              <Link
                className="text-md hover:underline underline-offset-4"
                href="/contact"
              >
                Contato
              </Link>
              <Link
                className="text-md hover:underline underline-offset-4"
                href="/signup"
              >
                <Button variant="default" size="sm" className="px-4">
                  Inscreva-se
                </Button>
              </Link>
              <Link href={"/login"}>
                <Button variant="outline" size="sm" className="px-4">
                  Login
                </Button>
              </Link>
              {/* <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <FileUpload />
                </DialogContent>
              </Dialog> */}
            </nav>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
