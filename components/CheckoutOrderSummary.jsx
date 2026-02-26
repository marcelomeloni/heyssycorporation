'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export function CheckoutOrderSummary({ shipping }) {
  // Puxando tudo do Contexto
  const { 
    cartItems, 
    cartTotal, 
    appliedCoupon, 
    setAppliedCoupon, // Usado para aplicar o cupom daqui
    discountValue, 
    finalTotal 
  } = useCart();

  // Estados locais para controlar o input do cupom
  const [couponInput, setCouponInput] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Soma o frete ao total final (que já tem o desconto do cupom)
  const totalWithShipping = finalTotal + (shipping?.price || 0);

  // Se o carrinho estiver vazio
  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-100 p-8 flex flex-col gap-4 text-center">
        <p className="font-oswald uppercase tracking-widest text-brand-gray">Seu carrinho está vazio.</p>
        <a href="/shop" className="text-xs underline font-bold uppercase">Voltar para a loja</a>
      </div>
    );
  }

  // Função para aplicar cupom de dentro do Checkout
  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    setIsApplying(true);
    setCouponError('');

    setTimeout(() => {
      // Simulação de validação de cupom
      if (couponInput.toUpperCase() === 'HEYSSY10') {
        setAppliedCoupon({ code: 'HEYSSY10', discountPercent: 10 });
        setCouponInput(''); // Limpa o input após sucesso
      } else {
        setCouponError('Cupom inválido ou expirado.');
      }
      setIsApplying(false);
    }, 800);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  return (
    <div className="bg-gray-50 border border-gray-100 p-8 flex flex-col gap-6 sticky top-8">
      <p className="font-oswald text-xs uppercase tracking-[0.3em] text-brand-gray">
        Seu Pedido
      </p>

      {/* ===== Lista de Itens ===== */}
      <div className="flex flex-col divide-y divide-gray-100">
        {cartItems.map((item) => (
          <div key={`${item.slug}-${item.size}`} className="flex gap-4 py-4">
            <div
              className="w-16 h-20 flex-shrink-0 border border-gray-100 bg-center bg-cover bg-no-repeat bg-white relative"
              style={{ backgroundImage: `url('${item.image}')` }}
            >
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 bg-black text-white font-inconsolata text-[9px] rounded-full shadow-sm">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1">
              <p className="font-oswald text-sm uppercase tracking-tight leading-tight">{item.name}</p>
              <p className="font-inconsolata text-[10px] text-brand-gray uppercase">Tam. {item.size}</p>
            </div>
            <p className="font-play font-bold text-sm self-center whitespace-nowrap">
              R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
            </p>
          </div>
        ))}
      </div>

      {/* ===== Lógica de Cupom ===== */}
      <div className="flex flex-col gap-2">
        {appliedCoupon ? (
          // Cupom Ativo - Aviso Verde
          <div className="bg-green-50 border border-green-200 px-4 py-3 flex justify-between items-center transition-all">
            <span className="font-inconsolata text-xs text-green-700 uppercase font-bold flex items-center gap-2">
              <i className="fa-solid fa-tag"></i> {appliedCoupon.code}
            </span>
            <button 
              onClick={handleRemoveCoupon}
              className="text-[10px] uppercase font-bold text-red-500 hover:underline tracking-widest"
            >
              Remover
            </button>
          </div>
        ) : (
          // Campo para digitar Cupom
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                placeholder="Cupom de desconto"
                className="flex-1 border border-gray-200 px-3 py-2 font-acumin text-xs focus:border-black outline-none bg-white uppercase placeholder:normal-case"
              />
              <button 
                onClick={handleApplyCoupon}
                disabled={!couponInput || isApplying}
                className="border border-black px-6 py-2 font-oswald text-[10px] uppercase tracking-widest bg-white hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isApplying ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'OK'}
              </button>
            </div>
            {couponError && (
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">
                {couponError}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ===== Totais ===== */}
      <div className="flex flex-col gap-3 border-t border-gray-200 pt-6">
        
        <div className="flex justify-between font-acumin text-sm">
          <span className="text-brand-gray">Subtotal</span>
          <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
        </div>
        
        {appliedCoupon && (
          <div className="flex justify-between font-acumin text-sm text-green-600 font-bold">
            <span>Desconto</span>
            <span>- R$ {discountValue.toFixed(2).replace('.', ',')}</span>
          </div>
        )}

        <div className="flex justify-between font-acumin text-sm">
          <span className="text-brand-gray">Frete</span>
          <span className={shipping ? '' : 'text-brand-gray italic text-xs'}>
            {shipping
              ? `R$ ${shipping.price.toFixed(2).replace('.', ',')}`
              : 'Calculado ao lado'}
          </span>
        </div>
        
        <div className="flex justify-between items-baseline border-t border-gray-200 pt-4 mt-2">
          <span className="font-oswald uppercase tracking-widest text-xs text-brand-gray">Total</span>
          <span className="font-play font-bold text-2xl">
            R$ {totalWithShipping.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>

      {/* ===== Trust Badges ===== */}
      <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
        {[
          { icon: 'fa-lock', text: 'Pagamento 100% seguro' },
          { icon: 'fa-rotate-left', text: 'Troca grátis em 30 dias' },
          { icon: 'fa-shield-halved', text: 'Dados protegidos' },
        ].map((b) => (
          <div key={b.text} className="flex items-center gap-2 text-brand-gray">
            <i className={`fa-solid ${b.icon} text-xs w-4 text-center`} />
            <span className="font-inconsolata text-[10px] uppercase tracking-wider">{b.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}