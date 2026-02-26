'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-brand-black text-white pt-16 pb-8 px-6 md:px-12 mt-20 z-40">
      
      {/* Grid Principal do Footer */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-gray-800 pb-12">
        
        {/* Coluna 1: Marca & Newsletter (Ocupa mais espaço) */}
        <div className="flex flex-col gap-4 md:col-span-5">
          <h2 className="font-halis text-3xl md:text-4xl tracking-widest uppercase">
            Heyssy Corp.
          </h2>
          <p className="font-acumin text-gray-400 text-sm max-w-sm">
            Inscreva-se para receber acesso antecipado aos próximos drops, senhas exclusivas e novidades.
          </p>
          
          {/* Input de Newsletter com visual brutalista */}
          <form className="flex mt-4 relative group w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="SEU E-MAIL..." 
              className="bg-transparent border-b border-gray-600 text-white font-inconsolata text-sm py-3 w-full focus:outline-none focus:border-white transition-colors uppercase placeholder:text-gray-600" 
            />
            <button 
              type="submit"
              className="absolute right-0 top-0 bottom-0 font-oswald uppercase tracking-widest text-sm text-gray-400 hover:text-white transition-colors"
            >
              Assinar
            </button>
          </form>
        </div>

        {/* Coluna 2: Navegação */}
        <div className="flex flex-col gap-4 md:col-span-3 md:col-start-7 font-acumin text-sm text-gray-400 uppercase tracking-widest">
          <h3 className="text-white font-bold mb-1">Navegação</h3>
          <Link href="/shop" className="hover:text-white hover:translate-x-1 transition-all w-fit">
            Shop
          </Link>
          <a href="https://discord.gg/4YdYnayt9Z" target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 transition-all w-fit">
            Community
          </a>
          <Link href="#" className="hover:text-white hover:translate-x-1 transition-all w-fit">
            Minha Conta
          </Link>
        </div>

        {/* Coluna 3: Suporte & Contato */}
        <div className="flex flex-col gap-4 md:col-span-3 font-acumin text-sm text-gray-400 uppercase tracking-widest">
          <h3 className="text-white font-bold mb-1">Suporte</h3>
          <a 
            href="https://wa.me/5519996833077" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-green-400 hover:translate-x-1 transition-all w-fit flex items-center gap-2"
          >
            <i className="fa-brands fa-whatsapp text-lg"></i> WhatsApp
          </a>
          <Link href="#" className="hover:text-white hover:translate-x-1 transition-all w-fit">
            Políticas de Troca
          </Link>
          <Link href="#" className="hover:text-white hover:translate-x-1 transition-all w-fit">
            Termos de Serviço
          </Link>
        </div>
      </div>

      {/* Linha Inferior: Direitos Autorais e Redes Sociais */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row justify-between items-center pt-8 gap-6">
        
        <p className="font-inconsolata text-xs text-gray-500 uppercase tracking-widest text-center md:text-left">
          &copy; {new Date().getFullYear()} Heyssy Corporation. Todos os direitos reservados.
        </p>
        
        <div className="flex gap-8">
          <a 
            href="https://www.instagram.com/heyssycorp/" 
            target="_blank" 
            rel="noreferrer" 
            className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all text-2xl" 
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram" />
          </a>
        
          <a 
            href="#" 
            className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all text-2xl" 
            aria-label="Twitter / X"
          >
            <i className="fa-brands fa-x-twitter" />
          </a>
        </div>
        
      </div>
    </footer>
  );
}