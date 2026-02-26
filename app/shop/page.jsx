'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/products';

// Categorias da loja
const categories = ['All', 'T-Shirts', 'Hoodies', 'Bottoms', 'Accessories'];

export default function ShopPage() {
  // Estado que controla qual categoria está clicada no momento
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="flex flex-col md:flex-row w-full max-w-[1400px] mx-auto min-h-[calc(100vh-110px)] pt-6 md:pt-16 px-4 md:px-12 gap-12">
      
      {/* ===== MENU MOBILE (Scroll Horizontal) ===== */}
      <div className="md:hidden flex overflow-x-auto gap-6 pb-2 snap-x [&::-webkit-scrollbar]:hidden border-b border-gray-100">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`snap-start whitespace-nowrap font-oswald text-xs tracking-widest uppercase transition-all duration-300 ${
              activeCategory === cat 
                ? 'text-black border-b-2 border-black pb-2 font-bold' 
                : 'text-gray-400 pb-2 hover:text-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ===== MENU LATERAL DESKTOP ===== */}
      <aside className="hidden md:flex flex-col w-[180px] flex-shrink-0 sticky top-[120px] h-fit">
        <h2 className="font-inconsolata text-xs uppercase tracking-widest text-brand-gray mb-6">
          Coleções
        </h2>
        <nav className="flex flex-col gap-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-oswald text-base tracking-[0.15em] uppercase transition-all flex items-center gap-3 group text-left ${
                activeCategory === cat ? 'text-brand-black' : 'text-gray-400 hover:text-brand-black'
              }`}
            >
              {/* Bolinha indicadora na categoria ativa com animação */}
              {activeCategory === cat && (
                <span className="w-1.5 h-1.5 bg-brand-black rounded-full animate-in zoom-in duration-300"></span>
              )}
              {/* Efeito de hover empurrando o texto sutilmente, mas só nos inativos */}
              <span className={`${activeCategory !== cat && 'group-hover:translate-x-1'} transition-transform duration-300`}>
                {cat}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ===== GRID DE PRODUTOS ===== */}
      <section className="flex-1 w-full pb-24">
        
        {/* Header do Grid (Só no Desktop) */}
        <div className="hidden md:flex justify-between items-end mb-10 pb-4 border-b border-gray-100 overflow-hidden">
          {/* O key={activeCategory} força o React a refazer a animação quando o texto muda */}
          <h1 
            key={activeCategory} 
            className="font-halis text-4xl uppercase tracking-tighter animate-in fade-in slide-in-from-left-4 duration-500"
          >
            {activeCategory === 'All' ? 'All' : activeCategory}
          </h1>
          <span className="font-inconsolata text-sm text-gray-400 uppercase tracking-widest">
            {PRODUCTS.length} Produtos
          </span>
        </div>

        {/* O Grid Real: 2 colunas no mobile, 3 no desktop */}
        {/* Nota: O .map continua renderizando todos os produtos, não estamos filtrando ainda! */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
        
      </section>
    </div>
  );
}