import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/ui/navbar";
import '@/app/globals.css';
import Providers from "@/app/_trpc/Providers";
import Footer from "./ui/footer";
import SessionWrapper from "@/components/login-auth/SessionWrapper";

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
    <SessionWrapper>
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <Navbar/>
          <main className='sm:px-32 px-10 py-8 mt-[100px] bg-slate-50 min-h-screen'>
            {children}
          </main>
        </Providers>
        <Footer/>
      </body>
    </html>
    </SessionWrapper>
  );
}
