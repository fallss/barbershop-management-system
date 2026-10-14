import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Barberia Luxe || Barbershop & Grooming Salon Premium",
  description:
    "Barberia Luxe - Barbershop Premium & Salon Grooming Pria Profesional",
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
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="/Design/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/Design/fonts/css/all.min.css" />
        <link rel="stylesheet" type="text/css" href="/Design/css/main.css" />
        <link rel="stylesheet" type="text/css" href="/Design/css/responsive.css" />
        <link rel="stylesheet" type="text/css" href="/Design/css/barber-icons.css" />
        <link rel="stylesheet" type="text/css" href="/Design/css/luxury-barber.css" />
        <link rel="stylesheet" type="text/css" href="/Design/css/appointment-page-style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
