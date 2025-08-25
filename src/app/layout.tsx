import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/app/_trpc/providers";
import Header from "@/ui/navigation/Header";
import Footer from "@/ui/navigation/Footer";
import '@/app/globals.css';

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
        <Providers>
          <Header/>
          <main className='sm:px-32 px-10 py-8 mt-[100px] bg-slate-50 min-h-screen'>
            {children}
          </main>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
