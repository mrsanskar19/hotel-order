import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/use-cart';
import { OrderProvider } from '@/hooks/use-orders';

export default function mainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="font-body antialiased">
        <OrderProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </OrderProvider>
      </main>
  );
}
