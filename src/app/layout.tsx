import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/ui/navbar";
import '@/app/globals.css';
import TRPCProvider from "@/app/_trpc/Provider";

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
        <TRPCProvider>
        <Navbar/>
        <main className='sm:px-32 px-10 py-8 bg-slate-50 min-h-screen'>
          {children}
        </main>
        </TRPCProvider>
      </body>
    </html>
  );
}
