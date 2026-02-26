'use client';

import { useState, use } from 'react'; // "use" serve para ler params no Next 15
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';

// Importando os seus componentes
import { ProductGallery } from '@/components/ProductGallery';
import { SizeSelector } from '@/components/SizeSelector';

// Note: No Next 15, params é uma Promise, então desestruturamos usando o hook "use"
export default function ProductPage({ params }) {
  const resolvedParams = use(params);
  const product = getProductBySlug(resolvedParams.slug);

  // Se a URL estiver errada ou produto não existir, manda pra página 404
  if (!product) notFound();

  // 1. Puxando a função de adicionar ao carrinho do nosso Contexto
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

  // 2. Função que dispara quando clica no botão "Adicionar ao Carrinho"
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho antes de continuar!');
      return;
    }
    
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.priceNumber, // Usando o número para o carrinho somar certo
      size: selectedSize,
      image: product.images[0] // Manda a primeira foto pro carrinho
    });
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto mt-16 px-4 pb-20">
      
      {/* Grid Principal */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 w-full">
        
        {/* ================= ESQUERDA: GALERIA ================= */}
        <div className="w-full lg:w-1/2">
          <ProductGallery images={product.images} />
        </div>

        {/* ================= DIREITA: INFORMAÇÕES ================= */}
        <div className="flex flex-col flex-1">
          
          <h1 className="font-halis text-3xl md:text-4xl tracking-wide uppercase text-brand-black">
            {product.name}
          </h1>

          <div className="flex gap-4 mt-2 font-inconsolata text-sm text-brand-gray uppercase tracking-widest">
            {/* Como não tem 'code' no lib/products, vou usar o slug como ref visual */}
            <span>Ref: {product.slug}</span>
            <span className="text-gray-300">|</span>
            <span>{product.type}</span>
          </div>

          <span className="block font-play font-bold text-3xl md:text-4xl mt-6">
            {product.price}
          </span>

          {/* Seletor de Tamanhos */}
          <div className="mt-8">
            <SizeSelector
              sizes={product.sizes}
              stock={product.stock}
              onChange={(size) => setSelectedSize(size)}
            />
          </div>

          {/* Nosso NOVO Botão de Carrinho */}
          <div className="mt-8 w-full max-w-[300px]">
            <button 
              onClick={handleAddToCart}
              disabled={product.unavailable}
              className={`w-full h-14 font-oswald text-lg tracking-widest uppercase transition-colors flex items-center justify-center gap-3 ${
                product.unavailable 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-brand-black text-white hover:bg-gray-800 active:scale-95'
              }`}
            >
              {product.unavailable ? 'Esgotado' : 'Adicionar ao Carrinho'}
            </button>
          </div>

          <hr className="my-10 border-gray-200" />

          {/* Descrição Dinâmica do lib/products */}
          <div className="flex flex-col gap-2 text-sm font-acumin text-brand-gray tracking-wide mb-6">
            <h3 className="text-black font-bold mb-2 uppercase">Descrição</h3>
            <p className="leading-relaxed">{product.description}</p>
          </div>

          {/* Tabela de Medidas (Pode manter fixa se todas camisas tiverem mesmo shape) */}
          <div className="mt-8 overflow-x-auto">
            <h3 className="text-black font-bold mb-4 font-acumin uppercase text-sm">
              Tabela de Medidas (Aproximadas - CM)
            </h3>
            <table className="w-full text-left border-collapse font-acumin text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-black text-brand-black">
                  <th className="py-3 px-4 font-semibold uppercase">Tamanho</th>
                  <th className="py-3 px-4 font-semibold uppercase">Comprimento</th>
                  <th className="py-3 px-4 font-semibold uppercase">Tórax</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: 'P', length: '60', chest: '90' },
                  { size: 'M', length: '62', chest: '94' },
                  { size: 'G', length: '64', chest: '98' },
                  { size: 'GG', length: '66', chest: '102' },
                  { size: 'XG', length: '68', chest: '106' },
                ].map((row) => (
                  <tr key={row.size} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-black">{row.size}</td>
                    <td className="py-3 px-4 text-brand-gray">{row.length} cm</td>
                    <td className="py-3 px-4 text-brand-gray">{row.chest} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}