import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { AppProvider } from '@/lib/AppContext';
import Toast from '@/components/Toast';
import DevPanel from '@/components/DevPanel';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-mulish',
  display: 'swap',
});

export const metadata = {
  title: 'Tide E-Invoicing',
  description: 'Send e-invoices directly into your clients\' accounting software',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Tide Invoicing' },
};

export const viewport = {
  themeColor: '#2B59FF',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script dangerouslySetInnerHTML={{
          __html: `if ('serviceWorker' in navigator) navigator.serviceWorker.register('/service-worker.js');`,
        }} />
      </head>
      <body className={plusJakartaSans.variable}>
        <AppProvider>
          <div className="app-shell">
            {children}
          </div>
          <Toast />
          <DevPanel />
        </AppProvider>
      </body>
    </html>
  );
}
