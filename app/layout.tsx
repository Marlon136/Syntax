import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/app/providers/LanguageProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Syntax",
  description: "Learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=optional"
        />

      </head>

      <body className="bg-neutral-50">

        <LanguageProvider>
          <Navbar />
          <br /> <br />
          {children}
          <Footer />
        </LanguageProvider>

      </body>

    </html>
  );
}