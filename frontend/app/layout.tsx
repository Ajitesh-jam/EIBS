import '../styles/globals.css';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;  