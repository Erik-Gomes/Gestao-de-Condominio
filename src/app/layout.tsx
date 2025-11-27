import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu from "../components/menu";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "sonner";

const supabase = createClient();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  const showMenu = session ? true : false;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Menu fixo à esquerda */}
        {showMenu && <Menu />}

        <div className={`${showMenu ? "ml-64" : ""} flex-1 p-6`}>{children}</div>
        {/* {children} */}
        <Toaster position="bottom-right" expand={true} richColors/> 
      </body>
    </html>
  );
}