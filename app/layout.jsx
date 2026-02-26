import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { OrdersProvider } from '@/contexts/OrdersContext';
import { CartProvider } from '@/contexts/CartContext';
import { CartSidebar } from '@/components/CartSidebar';
import { Toaster } from 'react-hot-toast'; // Importação do sistema de Toasts

// Configuração de SEO Completa
export const metadata = {
  title: {
    default: 'Heyssy Corporation',
    template: '%s | Heyssy'
  },
  description: 'Explora a Heyssy Corporation: a essência do streetwear underground com drops exclusivos, camisetas premium em algodão penteado e estampas autorais dark aesthetic.',
  keywords: ['streetwear', 'moda underground', 'heyssy', 'camisetas exclusivas', 'dark aesthetic', 'skatewear brasil'],
  authors: [{ name: 'Heyssy Corp' }],
  creator: 'Heyssy Corporation',
  publisher: 'Heyssy Corporation',
  


  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preconnect para carregar o Font Awesome mais rápido */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="flex flex-col min-h-screen bg-white antialiased">
        {/* Configuração Global dos Toasts (estilizado para o tema Heyssy) */}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#000',
              color: '#fff',
              borderRadius: '0px', // Estética brutalista quadrada
              fontFamily: 'var(--font-acumin)',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              border: '1px solid #333'
            },
            success: {
              iconTheme: {
                primary: '#fff',
                secondary: '#000',
              },
            },
          }}
        />

        <AuthProvider>
          <OrdersProvider>
            <CartProvider>
              
              <Navbar />
              <CartSidebar />
              
              <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden min-w-0">
                {children}
              </main>
              
              <Footer />
              
            </CartProvider>
          </OrdersProvider>
        </AuthProvider>
      </body>
    </html>
  );
}