import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'BookBuddy',
  description: 'Exchange books with people nearby',
  icons: {
    icon: '/bookbuddy.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-7xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
