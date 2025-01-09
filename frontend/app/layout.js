import "./globals.css";

import "../public/css/bootstrap.css"


import "../public/css/color.css"
import "../public/css/style.css"
import 'swiper/css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
