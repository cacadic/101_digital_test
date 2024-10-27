import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ModalProvider from "@/components/provider/modal-provider";
import { auth } from "@/auth";
import HeaderNav from "@/components/header/header-nav";
import ToastProvider from "@/components/provider/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-full flex-col items-center">
          <HeaderNav />
          {children}
        </main>
        <ModalProvider session={session} />
        <ToastProvider />
      </body>
    </html>
  );
}