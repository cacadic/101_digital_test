import { Inter } from "next/font/google";
import React, { ReactNode } from "react";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <div className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
};

export default AuthLayout;
