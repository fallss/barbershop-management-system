import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Barberia Luxe | Barbershop Premium & Gentleman Grooming Jakarta",
  description:
    "Barbershop premium berkelas di Senopati Jakarta Selatan. Layanan potong rambut pria klasik, modern fade, royal hot towel shave, dan perawatan grooming terbaik dengan master barber berpengalaman.",
  keywords: [
    "barbershop jakarta",
    "barber premium senopati",
    "potong rambut pria jakarta",
    "hot towel shave",
    "gentleman grooming",
    "barberia luxe",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#0b0c10] text-[#f8f9fa] antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
