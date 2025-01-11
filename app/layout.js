import "./globals.css";
import { LoginProvider } from "@/contexts/loginContext";
import Footer from "@/components/footer/footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoginProvider>
        {children}
        <Footer/>
        </LoginProvider>
      </body>
    </html>
  );
}
