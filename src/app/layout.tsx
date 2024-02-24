import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Olimpiada Iberoamericana de Matemática",
  description: "Página para la recopilación de datos de la OIM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar/>
        <div className='sm:px-32 px-10 py-8 bg-slate-50'>
          {children}
        </div>
      </body>
    </html>
  );
}
