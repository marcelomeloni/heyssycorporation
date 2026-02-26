'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext'; 

export function Navbar() {
  const { toggleCart, cartCount } = useCart();
  const { currentUser } = useAuth(); 

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white z-50 sticky top-0 border-b border-gray-100">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/heyssyaa.png"
          alt="Heyssy"
          width={100}
          height={60}
          className="object-contain hover:scale-105 transition-transform duration-300"
          priority
        />
      </Link>

      {/* Main nav links */}
      <div className="flex gap-8 hidden md:flex items-center">
        <Link href="/shop" className="font-oswald text-brand-black hover:text-gray-400 transition-colors tracking-[0.2em] uppercase text-xs font-medium">
          shop
        </Link>
        
        <a 
          href="https://discord.gg/4YdYnayt9Z" 
          target="_blank" 
          rel="noreferrer" 
          className="font-oswald text-brand-black hover:text-blue-500 transition-colors tracking-[0.2em] uppercase text-xs font-medium flex items-center gap-2"
        >
          community
        </a>

        <Link href="/social" target="_blank" className="font-oswald text-brand-black hover:text-pink-500 transition-colors tracking-[0.2em] uppercase text-xs font-medium">
          social
        </Link>
      </div>

      {/* Icons Section */}
      <div className="flex gap-6 items-center">
        
        {/* LÓGICA DE LOGIN / PERFIL */}
        {currentUser ? (
          // SE ESTIVER LOGADO: Ícone de Perfil apontando para /account
          <Link 
            href="/account" 
            aria-label="Minha Conta" 
            className="text-brand-black hover:scale-110 transition-transform hidden sm:block relative group"
          >
            <i className="fa-solid fa-user text-lg" />
            {/* Tooltip com o nome do usuário */}
            <span className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {currentUser.name.split(' ')[0]} {/* Pega só o primeiro nome */}
            </span>
          </Link>
        ) : (
          // SE NÃO ESTIVER LOGADO: Ícone de Login apontando para a página que acabamos de criar
          <Link 
            href="/login" 
            aria-label="Fazer Login" 
            className="text-brand-black hover:scale-110 transition-transform hidden sm:block relative group"
          >
            <i className="fa-solid fa-arrow-right-to-bracket text-lg" />
            {/* Tooltip de Login */}
            <span className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Login
            </span>
          </Link>
        )}
        
        {/* Ícone do Carrinho */}
        <button 
          aria-label="Carrinho" 
          onClick={toggleCart}
          className="text-brand-black hover:scale-110 transition-transform relative"
        >
          <i className="fa-solid fa-cart-shopping text-lg" />
          
          {/* Badge de Quantidade */}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}