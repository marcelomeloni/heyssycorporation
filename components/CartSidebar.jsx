'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export function CartSidebar() {
  const router = useRouter();

  // Puxamos os estados globais do carrinho, incluindo o cupom e os cálculos finais
  const { 
    isOpen, 
    toggleCart, 
    cartItems, 
    removeFromCart, 
    cartTotal,
    appliedCoupon, 
    setAppliedCoupon, 
    discountValue, 
    finalTotal 
  } = useCart();

  // Estados locais para controlar apenas a digitação e os alertas do cupom
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });

  // Função simulada para aplicar o cupom
  const handleApplyCoupon = () => {
    if (!couponCode) return;
    
    setIsApplying(true);
    setCouponMessage({ type: '', text: '' });

    setTimeout(() => {
      if (couponCode === 'HEYSSY10') {
        setAppliedCoupon({ code: 'HEYSSY10', discountPercent: 10 });
        setCouponMessage({ type: 'success', text: 'Cupom de 10% aplicado com sucesso!' });
      } else {
        setCouponMessage({ type: 'error', text: 'Cupom inválido ou expirado.' });
      }
      setIsApplying(false);
    }, 800);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponMessage({ type: '', text: '' });
  };

  // Função que faz a mágica: fecha a sidebar e vai pro checkout
  const goToCheckout = () => {
    toggleCart(); // Fecha a sidebar lateral
    router.push('/checkout'); // Navega para a página de checkout
  };

  return (
    <>
      {/* Overlay escuro de fundo */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-all duration-300"
          onClick={toggleCart}
        />
      )}

      {/* Sidebar deslizando da direita */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header da Sidebar */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="font-oswald text-2xl uppercase tracking-wider">Seu Carrinho</h2>
          <button 
            onClick={toggleCart} 
            className="text-2xl text-gray-400 hover:text-black hover:rotate-90 transition-all duration-300"
          >
            &times;
          </button>
        </div>

        {/* Lista de Produtos */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-50">
              <i className="fa-solid fa-cart-arrow-down text-4xl mb-4"></i>
              <p className="font-acumin text-center tracking-wide uppercase text-sm">
                Seu carrinho está vazio
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.slug}-${item.size}`} className="flex gap-4 group">
                <div className="w-20 h-24 relative bg-gray-50 flex-shrink-0 border border-gray-100 overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col flex-1 justify-between py-1">
                  <div>
                    <h3 className="font-acumin font-bold text-sm leading-tight uppercase line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 font-inconsolata">TAM: {item.size}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-play font-bold">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-inconsolata text-gray-500 border px-2 py-1">QTD: {item.quantity}</span>
                      <button
                        onClick={() => removeFromCart(item.slug, item.size)}
                        className="text-gray-400 hover:text-red-500 text-xs uppercase tracking-wide transition-colors"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer do Carrinho (Cupom, Totais e Checkout) */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white flex flex-col gap-4">
            
            {/* ====== SEÇÃO DE CUPOM ====== */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-acumin font-bold uppercase tracking-wider text-gray-500">
                Código de Desconto
              </label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: HEYSSY10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  disabled={appliedCoupon !== null}
                  className="flex-1 border border-gray-300 px-3 py-3 text-sm font-inconsolata focus:outline-none focus:border-black transition-colors uppercase disabled:bg-gray-50 disabled:text-gray-400"
                />
                
                {appliedCoupon ? (
                  <button
                    onClick={handleRemoveCoupon}
                    className="bg-red-50 text-red-500 border border-red-200 px-4 py-3 font-oswald text-sm uppercase tracking-wider hover:bg-red-100 transition-colors flex items-center justify-center min-w-[100px]"
                  >
                    Remover
                  </button>
                ) : (
                  <button
                    onClick={handleApplyCoupon}
                    disabled={!couponCode || isApplying}
                    className="bg-black text-white px-4 py-3 font-oswald text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                  >
                    {isApplying ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Aplicar'}
                  </button>
                )}
              </div>

              {/* Mensagem de Feedback do Cupom */}
              {couponMessage.text && (
                <p className={`text-xs font-acumin mt-1 flex items-center gap-1 ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                  <i className={`fa-solid ${couponMessage.type === 'success' ? 'fa-check-circle' : 'fa-circle-exclamation'}`}></i>
                  {couponMessage.text}
                </p>
              )}
            </div>

            <hr className="border-gray-100 my-2" />

            {/* ====== SEÇÃO DE TOTAIS ====== */}
            <div className="flex flex-col gap-2 font-acumin text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>R$ {cartTotal?.toFixed(2).replace('.', ',')}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Desconto ({appliedCoupon.code})</span>
                  <span>- R$ {discountValue?.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              
              <div className="flex justify-between font-play font-bold text-2xl mt-2 text-black">
                <span>TOTAL</span>
                <span>R$ {finalTotal?.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            {/* Botão de Checkout Redirecionando */}
            <button 
              onClick={goToCheckout}
              className="w-full mt-2 bg-brand-black text-white font-oswald text-lg uppercase tracking-widest py-4 hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              Finalizar Compra
              <i className="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
}