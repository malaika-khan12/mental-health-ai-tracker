import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'MindEase - Your Mental Health Companion',
  description: 'Track moods, view insights, and improve mental wellness with AI.',
  icons: {
    icon: '/images/lotus.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/lotus.png" type="image/png" />
      </head>
      <body>
        <Navbar />
        <main className="main-container">{children}</main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} MindEase. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
