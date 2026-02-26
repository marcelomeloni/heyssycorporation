'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const { toggleCart, cartCount } = useCart();
  const { currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o menu mobile quando muda de página
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Impede o scroll do corpo quando o menu mobile está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white z-[60] sticky top-0 border-b border-gray-100">
        
        {/* Menu Mobile Button (Hambúrguer) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-black focus:outline-none w-8 h-8 flex items-center justify-center"
          aria-label="Menu"
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-xl`}></i>
        </button>

        {/* Logo (Centralizada no mobile) */}
        <Link href="/" className="flex-shrink-0 md:static absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0">
          <Image
            src="/heyssyaa.png"
            alt="Heyssy"
            width={90}
            height={50}
            className="object-contain hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/shop" className="font-oswald text-black hover:text-gray-400 transition-colors tracking-[0.2em] uppercase text-xs font-medium">
            shop
          </Link>
          <a 
            href="https://discord.gg/4YdYnayt9Z" 
            target="_blank" 
            rel="noreferrer" 
            className="font-oswald text-black hover:text-blue-500 transition-colors tracking-[0.2em] uppercase text-xs font-medium"
          >
            community
          </a>
          <Link href="/social" className="font-oswald text-black hover:text-pink-500 transition-colors tracking-[0.2em] uppercase text-xs font-medium">
            social
          </Link>
        </div>

        {/* Icons Section */}
        <div className="flex gap-5 items-center">
          
          {/* User Icon (Hidden on mobile - moved inside mobile menu) */}
          <div className="hidden md:block">
            {currentUser ? (
              <Link href="/account" className="relative group text-black">
                <i className="fa-solid fa-user text-lg" />
                <span className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {currentUser.name.split(' ')[0]}
                </span>
              </Link>
            ) : (
              <Link href="/login" className="relative group text-black">
                <i className="fa-solid fa-arrow-right-to-bracket text-lg" />
                <span className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Login
                </span>
              </Link>
            )}
          </div>
          
          {/* Cart Icon */}
          <button 
            onClick={toggleCart}
            className="text-black hover:scale-110 transition-transform relative p-1"
          >
            <i className="fa-solid fa-cart-shopping text-lg" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 bg-white z-[55] md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className="flex flex-col h-full px-8 pt-24 pb-12">
          
          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-6">
            <Link href="/shop" className="font-halis text-5xl uppercase tracking-tighter text-black border-b border-gray-100 pb-4">
              Shop
            </Link>
            <a 
              href="https://discord.gg/4YdYnayt9Z" 
              target="_blank" 
              className="font-halis text-5xl uppercase tracking-tighter text-black border-b border-gray-100 pb-4"
            >
              Community
            </a>
            <Link href="/social" className="font-halis text-5xl uppercase tracking-tighter text-black border-b border-gray-100 pb-4">
              Social
            </Link>
          </div>

          {/* Account Section in Mobile Menu */}
          <div className="mt-auto">
            <Link 
              href={currentUser ? "/account" : "/login"} 
              className="flex items-center gap-4 p-6 bg-black text-white"
            >
              <i className={`fa-solid ${currentUser ? 'fa-user' : 'fa-arrow-right-to-bracket'} text-2xl`}></i>
              <div className="flex flex-col">
                <span className="font-oswald text-xl uppercase tracking-widest">
                  {currentUser ? `Olá, ${currentUser.name.split(' ')[0]}` : 'Minha Conta'}
                </span>
                <span className="font-inconsolata text-[10px] uppercase tracking-widest opacity-60">
                  {currentUser ? 'Ver perfil e pedidos' : 'Acesse para comprar rápido'}
                </span>
              </div>
            </Link>
          </div>

          {/* Social Micro-links */}
          <div className="mt-8 flex gap-6 text-gray-400">
             <i className="fa-brands fa-instagram text-xl"></i>
             <i className="fa-brands fa-tiktok text-xl"></i>
             <i className="fa-brands fa-discord text-xl"></i>
          </div>
        </div>
      </div>
    </>
  );
}
