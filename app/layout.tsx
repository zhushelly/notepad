import './globals.css';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Notepad App</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
