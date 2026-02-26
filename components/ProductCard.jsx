'use client';

import { useRouter } from 'next/navigation';

export function ProductCard({
  slug,
  name,
  type,
  price,
  imageFront,
  imageBack,
  unavailable = false,
}) {
  const router = useRouter();

  const handleClick = () => {
    if (!unavailable) router.push(`/product/${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group flex flex-col gap-4 w-full transition-all duration-300 ${
        unavailable ? 'cursor-not-allowed opacity-70 grayscale-[20%]' : 'cursor-pointer'
      }`}
    >
      {/* Container da Imagem com Aspect Ratio perfeito (4:5) */}
      <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden border border-gray-100">
        
        {/* Badge de Esgotado */}
        {unavailable && (
          <div className="absolute top-4 left-4 z-20 bg-brand-black text-white px-3 py-1 font-oswald text-[10px] uppercase tracking-widest shadow-md">
            Esgotado
          </div>
        )}

        {/* Imagem Frontal (Some no hover) */}
        <img
          src={imageFront}
          alt={name}
          className={`absolute inset-0 w-full h-full object-contain p-4 z-10 transition-opacity duration-500 ease-in-out ${
            !unavailable ? 'group-hover:opacity-0' : ''
          }`}
        />
        
        {/* Imagem Traseira (Fica no fundo e é revelada) */}
        {!unavailable && (
          <img
            src={imageBack}
            alt={`${name} costas`}
            className="absolute inset-0 w-full h-full object-contain p-4 z-0"
          />
        )}
      </div>

      {/* Informações (Alinhamento Editorial à Esquerda) */}
      <div className="flex flex-col gap-1 text-left px-1">
        <span className="font-inconsolata text-[10px] text-brand-gray uppercase tracking-widest">
          {type}
        </span>
        <h3 className="font-acumin font-bold text-sm md:text-base leading-tight uppercase text-brand-black line-clamp-2">
          {name}
        </h3>
        <span className="font-play font-bold text-lg mt-1">
          {typeof price === 'number' ? `R$ ${price.toFixed(2).replace('.', ',')}` : price}
        </span>
      </div>
    </div>
  );
}