'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function CheckoutSuccess({ orderId, data }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Agora extrai diretamente de 'data' que contém os valores congelados do pedido
  const { address, shipping, payment, items, coupon, total } = data;

  const paymentLabel =
    payment?.method === 'pix'
      ? 'Pix'
      : payment?.method === 'boleto'
      ? 'Boleto Bancário'
      : `Cartão •••• ${payment?.card?.number?.replace(/\s/g, '').slice(-4) ?? '????'}`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="border-b border-gray-100 px-6 py-5 flex justify-center">
        <Image src="/heyssyaa.png" alt="Heyssy" width={90} height={54} className="object-contain" />
      </div>

      <div className={`flex-1 max-w-3xl mx-auto px-6 py-16 md:py-24 w-full transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-black flex items-center justify-center mx-auto mb-8 relative">
            <i className="fa-solid fa-check text-white text-2xl" />
            <div className="absolute inset-0 border-2 border-black " />
          </div>

          <p className="font-inconsolata text-xs uppercase tracking-[0.4em] text-brand-gray mb-3">
            Pedido Confirmado
          </p>
          <h1
            className="font-oswald uppercase text-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', letterSpacing: '-0.02em' }}
          >
            Obrigado!
          </h1>
          <p className="font-acumin text-brand-gray mt-4 text-sm">
            Seu pedido <span className="font-bold text-black">{orderId}</span> foi recebido e já está sendo processado.
          </p>
          <p className="font-acumin text-brand-gray text-sm mt-1">
            Você receberá atualizações no e-mail{' '}
            <span className="font-bold text-black">{address?.email}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="border border-gray-100 p-6">
            <p className="font-inconsolata text-[10px] uppercase tracking-widest text-brand-gray mb-2">Número do Pedido</p>
            <p className="font-oswald text-2xl">{orderId}</p>
          </div>

          <div className="border border-gray-100 p-6">
            <p className="font-inconsolata text-[10px] uppercase tracking-widest text-brand-gray mb-2">Envio</p>
            <p className="font-oswald text-sm uppercase tracking-wider">{shipping?.label}</p>
            <p className="font-acumin text-xs text-brand-gray mt-1">{shipping?.days}</p>
          </div>

          <div className="border border-gray-100 p-6">
            <p className="font-inconsolata text-[10px] uppercase tracking-widest text-brand-gray mb-2">Entregando para</p>
            <p className="font-acumin text-sm font-bold">{address?.name}</p>
            <p className="font-acumin text-xs text-brand-gray">
              {address?.street}, {address?.number} — {address?.city}/{address?.state}
            </p>
          </div>

          <div className="border border-gray-100 p-6">
            <p className="font-inconsolata text-[10px] uppercase tracking-widest text-brand-gray mb-2">Pagamento</p>
            <p className="font-oswald text-sm uppercase tracking-wider">{paymentLabel}</p>
            <p className="font-play font-bold text-sm mt-1 text-green-600">
              Total Pago: R$ {total?.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-10 mb-12">
          <div className="flex justify-between items-center mb-6">
            <p className="font-inconsolata text-[10px] uppercase tracking-[0.3em] text-brand-gray">Itens Adquiridos</p>
            {coupon && <span className="font-inconsolata text-[10px] text-green-600 bg-green-50 px-2 py-1 uppercase tracking-widest">Cupom {coupon.code}</span>}
          </div>
          
          <div className="flex flex-col divide-y divide-gray-50">
            {items?.map((item) => (
              <div key={`${item.slug}-${item.size}`} className="flex items-center gap-5 py-4">
                <div
                  className="w-14 h-16 border border-gray-100 bg-center bg-no-repeat flex-shrink-0"
                  style={{ backgroundImage: `url('${item.image}')`, backgroundSize: 'contain' }}
                />
                <div className="flex-1">
                  <p className="font-oswald text-sm uppercase tracking-tight">{item.name}</p>
                  <p className="font-inconsolata text-[10px] text-brand-gray uppercase mt-0.5">
                    Tam. {item.size} · Qtd. {item.quantity}
                  </p>
                </div>
                <p className="font-play font-bold">
                  R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/account"
            className="flex-1 bg-black text-white text-center py-4 font-oswald uppercase tracking-widest hover:bg-gray-800 transition-all text-sm"
          >
            Acompanhar Pedido
          </Link>
          <Link
            href="/shop"
            className="flex-1 border border-black text-center py-4 font-oswald uppercase tracking-widest hover:bg-black hover:text-white transition-all text-sm"
          >
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}