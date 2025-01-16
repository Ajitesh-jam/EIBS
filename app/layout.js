'use client'
import "./globals.css";
import { LoginProvider } from "@/contexts/loginContext";
import Footer from "@/components/footer/footer";
import { SessionProvider } from 'next-auth/react';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <LoginProvider>
            {children}
            <Footer />
          </LoginProvider>
        </SessionProvider>

      </body>
    </html>
  );
}
