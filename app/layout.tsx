import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/application/Header";
import Footer from "@/components/application/Footer";
import { Toaster } from "@/components/ui/toaster";
import { GoogleTagManager } from "@next/third-parties/google";
import FAQButton from "@/components/application/FAQButton";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <GoogleTagManager gtmId="AW-16976370308" />
      </head>
      <body
        className={`${poppins.className} antialiased leading-5 flex flex-col min-h-screen text-xl relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Toaster />
          <FAQButton />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
