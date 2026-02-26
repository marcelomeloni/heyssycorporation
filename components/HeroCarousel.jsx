'use client';

// Importamos o useRef para controlar a rolagem
import { useRef } from 'react';

const slides = [
  { src: '/droparts/heyssydrop2.jpg', alt: 'Heyssy Drop 2' },
  { src: '/droparts/maloka.jpg', alt: 'Maloka' },

];

export function HeroCarousel() {
  // Criamos uma referência para o container do carrossel
  const carouselRef = useRef(null);

  // Função para rolar para os lados quando clicar nos botões
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth' // Rola macio!
      });
    }
  };

  return (
    // Adicionei a classe 'group' e 'relative' aqui
    <div className="w-full relative max-w-[100vw] pt-10 group">
      
      {/* Botão Esquerda */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-black text-black hover:text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
        aria-label="Imagem anterior"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {/* O trilho do carrossel (adicionei o ref={carouselRef} aqui) */}
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {slides.map((slide) => (
          <div 
            key={slide.src} 
            className="w-full flex-none snap-center flex justify-center items-center px-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="h-[400px] md:h-[500px] w-auto object-contain pointer-events-none select-none"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Botão Direita */}
      <button 
        onClick={() => scroll('right')}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-black text-black hover:text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
        aria-label="Próxima imagem"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>

    </div>
  );
}