import "./globals.css";
import { LoginProvider } from "@/contexts/loginContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoginProvider>
        {children}
        </LoginProvider>
      </body>
    </html>
  );
}
