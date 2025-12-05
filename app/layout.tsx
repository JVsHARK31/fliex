import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/ui/Header";
import Footer from "./_components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TheMoviesStream - Watch Movies & Series Online",
  description: "Stream your favorite movies and TV shows. Discover trending content, new releases, and classic favorites.",
  keywords: "movies, series, streaming, watch online, Netflix alternative",
  icons: {
    icon: [
      { url: '/logo.webp' },
      { url: '/logo.webp', sizes: '32x32', type: 'image/webp' },
    ],
    apple: [
      { url: '/logo.webp' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/logo.webp" type="image/webp" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

