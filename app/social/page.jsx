'use client';

import Link from 'next/link';

export default function SocialPage() {
  const links = [
    {
      name: 'Instagram',
      handle: '@heyssycorporation',
      url: 'https://www.instagram.com/heyssycorp/',
      icon: 'fa-instagram',
      color: 'hover:text-pink-500'
    },
    {
      name: 'Discord',
      handle: 'Heyssy Squad',
      url: 'https://discord.gg/4YdYnayt9Z',
      icon: 'fa-discord',
      color: 'hover:text-blue-500'
    },
    {
      name: 'Spotify',
      handle: 'Darkness Playlist',
      url: '#',
      icon: 'fa-spotify',
      color: 'hover:text-green-500'
    },
    {
      name: 'TikTok',
      handle: '@heyssycorp',
      url: '#',
      icon: 'fa-tiktok',
      color: 'hover:text-cyan-400'
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-12 md:py-24 overflow-hidden relative">
      
      {/* Background Decorativo - Letra H gigante e translúcida */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-halis text-[40vw] text-gray-50 select-none pointer-events-none z-0 opacity-50">
        H
      </div>

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        
        {/* Header da Página */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-halis text-5xl md:text-7xl uppercase tracking-tighter text-black leading-none mb-4">
            Heyssy<br/>Connect
          </h1>
          <div className="h-1 w-20 bg-black mx-auto mb-6"></div>
          <p className="font-inconsolata text-xs uppercase tracking-[0.4em] text-brand-gray">
            Join the underground corporation
          </p>
        </div>

        {/* Grid de Links Estilo Brutalista */}
        <div className="w-full flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group w-full bg-white border-2 border-black p-6 flex items-center justify-between transition-all duration-500 hover:bg-black hover:text-white ${link.color}`}
            >
              <div className="flex flex-col">
                <span className="font-oswald text-2xl uppercase tracking-widest leading-none">
                  {link.name}
                </span>
                <span className="font-inconsolata text-[10px] uppercase tracking-widest mt-2 opacity-60 group-hover:opacity-100 group-hover:text-white transition-all">
                  {link.handle}
                </span>
              </div>
              <i className={`fa-brands ${link.icon} text-3xl transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500`}></i>
            </a>
          ))}
        </div>

        {/* Footer da Página / CTA Secundário */}
        <div className="mt-20 flex flex-col items-center gap-8 animate-in fade-in duration-1000 delay-500">
          <Link 
            href="/shop"
            className="font-oswald text-sm uppercase tracking-[0.3em] border-b-2 border-black pb-1 hover:text-brand-gray hover:border-brand-gray transition-all"
          >
            Back to Shop
          </Link>

          <div className="text-center">
            <p className="font-acumin text-[10px] uppercase tracking-[0.5em] text-gray-300">
              Heyssy Corp &copy; 2023
            </p>
            <p className="font-inconsolata text-[9px] uppercase tracking-widest text-gray-200 mt-2">
              Based in Brazil • Global mindset
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}