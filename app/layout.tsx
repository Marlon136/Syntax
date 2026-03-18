import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

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

        <Navbar />

        <main>
          {children}
        </main>

        <Footer />

      </body>

    </html>
  );
}