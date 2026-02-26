'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast'; // <-- Importando o toast

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { login, register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (isLogin) {
        const response = login(email, password);
        if (response.success) {
          toast.success('Bem-vindo de volta!', {
            style: { borderRadius: '0px', background: '#333', color: '#fff', fontFamily: 'var(--font-acumin)' }
          });
          router.push('/account');
        } else {
          toast.error(response.message || 'Erro ao entrar.');
          setIsLoading(false);
        }
      } else {
        const response = register(name, email, password);
        if (response.success) {
          toast.success('Conta criada! Agora é só entrar.', {
             duration: 4000,
             style: { borderRadius: '0px', border: '1px solid #000' }
          });
          setIsLogin(true);
          setPassword('');
          setIsLoading(false);
        } else {
          toast.error(response.message || 'Erro ao cadastrar.');
          setIsLoading(false);
        }
      }
    }, 1200);
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
    setPassword('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-16 md:py-24 min-h-[75vh] flex items-center overflow-hidden">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">
        
        <div className={`flex flex-col justify-center transition-all duration-700 ease-in-out order-1 ${isLogin ? 'md:order-1' : 'md:order-2'} animate-in fade-in slide-in-from-bottom-4`}>
          
          <h1 className="font-halis text-4xl uppercase tracking-tighter text-brand-black mb-2">
            {isLogin ? 'Acessar Conta' : 'Criar Conta'}
          </h1>
          <p className="font-acumin text-brand-gray mb-8 text-sm">
            {isLogin 
              ? 'Bem-vindo de volta. Insira suas credenciais para entrar.' 
              : 'Junte-se a nós. Preencha seus dados para criar sua conta.'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {!isLogin && (
              <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-500">
                <label className="text-[10px] font-bold uppercase text-brand-gray tracking-widest font-inconsolata">Nome Completo</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  placeholder="Seu nome"
                  className="w-full border border-gray-200 px-4 py-4 font-acumin text-sm focus:border-black outline-none transition-colors bg-white"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase text-brand-gray tracking-widest font-inconsolata">E-mail</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
                placeholder="seu@email.com"
                className="w-full border border-gray-200 px-4 py-4 font-acumin text-sm focus:border-black outline-none transition-colors bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase text-brand-gray tracking-widest font-inconsolata">Senha</label>
                {isLogin && (
                  <Link href="#" className="text-[10px] font-bold uppercase text-brand-gray tracking-widest hover:text-black underline transition-colors">
                    Esqueci minha senha
                  </Link>
                )}
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full border border-gray-200 px-4 py-4 font-acumin text-sm focus:border-black outline-none transition-colors bg-white pr-12"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !email || !password || (!isLogin && !name)}
              className="w-full mt-4 bg-black text-white py-4 font-oswald uppercase text-lg tracking-widest hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
              ) : (
                <>
                  {isLogin ? 'Entrar' : 'Cadastrar'}
                  <i className="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform text-sm"></i>
                </>
              )}
            </button>
          </form>
        </div>

        <div className={`bg-gray-50 border border-gray-100 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group transition-all duration-700 ease-in-out order-2 ${isLogin ? 'md:order-2' : 'md:order-1'}`}>
          <div className="absolute -right-10 -top-10 text-[150px] text-gray-100 opacity-50 font-halis select-none pointer-events-none group-hover:scale-110 transition-transform duration-700">H.</div>

          <div className="relative z-10 animate-in fade-in duration-500">
            <h2 className="font-oswald text-2xl uppercase tracking-widest mb-4">
              {isLogin ? 'Novo por aqui?' : 'Já é da família?'}
            </h2>
            <p className="font-acumin text-brand-gray text-sm leading-relaxed mb-8">
              {isLogin 
                ? 'Crie sua conta na Heyssy para ter uma experiência completa. Membros registrados possuem vantagens exclusivas.'
                : 'Acesse sua conta para acompanhar seus pedidos em tempo real, gerenciar seus endereços e acessar drops antecipados.'}
            </p>

            {isLogin && (
              <ul className="flex flex-col gap-4 font-inconsolata text-sm text-brand-black mb-10">
                <li className="flex items-center gap-3"><i className="fa-solid fa-bolt text-black"></i> Checkout mais rápido</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-box-open text-black"></i> Rastreio em tempo real</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-key text-black"></i> Acesso antecipado</li>
              </ul>
            )}

            <button 
              onClick={toggleView}
              className={`inline-flex items-center justify-center w-full bg-transparent border-2 border-black text-black py-4 font-oswald uppercase text-lg tracking-widest hover:bg-black hover:text-white active:scale-[0.98] transition-all ${!isLogin && 'mt-6'}`}
            >
              {isLogin ? 'Criar Conta' : 'Fazer Login'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}