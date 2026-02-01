import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers";
import { Header, Footer } from "@/components/layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MovieApp - Discover Movies & TV Shows",
    template: "%s | MovieApp",
  },
  description: "Discover and explore movies and TV shows. Find trending, popular, and top-rated content with MovieApp.",
  keywords: ["movies", "tv shows", "streaming", "entertainment", "TMDB"],
  authors: [{ name: "MovieApp" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MovieApp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} min-h-screen bg-[#0a0a0f] font-sans text-white antialiased`}
      >
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
