'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useOrders } from '@/contexts/OrdersContext';

const STEPS = [
  { key: 'Aprovado', label: 'Pedido Confirmado', icon: 'fa-circle-check', desc: 'Recebemos seu pedido.' },
  { key: 'Em Preparação', label: 'Em Preparação', icon: 'fa-box', desc: 'Sua peça está sendo separada.' },
  { key: 'Em Trânsito', label: 'Em Trânsito', icon: 'fa-truck-fast', desc: 'Saiu para entrega.' },
  { key: 'Entregue', label: 'Entregue', icon: 'fa-house-chimney-crack', desc: 'Pedido recebido.' },
];

const STATUS_ORDER = ['Aprovado', 'Em Preparação', 'Em Trânsito', 'Entregue'];

function StatusTracker({ currentStatus }) {
  const currentIdx = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="flex flex-col gap-0 relative">
      {STEPS.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        const pending = i > currentIdx;

        return (
          <div key={step.key} className="flex items-start gap-6 relative">
            {/* Vertical line */}
            {i < STEPS.length - 1 && (
              <div className="absolute left-[19px] top-10 w-[2px] h-[calc(100%-8px)] z-0"
                style={{ background: done || active ? '#0a0a0a' : '#e5e7eb' }}
              />
            )}

            {/* Icon circle */}
            <div className={`relative z-10 w-10 h-10 flex items-center justify-center flex-shrink-0 border-2 transition-all duration-500 ${
              done ? 'bg-black border-black text-white'
              : active ? 'bg-black border-black text-white shadow-[0_0_0_4px_rgba(0,0,0,0.12)]'
              : 'bg-white border-gray-200 text-gray-300'
            }`}>
              <i className={`fa-solid ${step.icon} text-xs`} />
            </div>

            {/* Text */}
            <div className={`pb-10 pt-1 ${pending ? 'opacity-30' : ''}`}>
              <p className={`font-oswald uppercase tracking-widest text-sm ${active ? 'text-black' : done ? 'text-black' : 'text-gray-400'}`}>
                {step.label}
                {active && (
                  <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-black animate-pulse align-middle" />
                )}
              </p>
              <p className="font-acumin text-xs text-brand-gray mt-0.5">{step.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 border border-black px-4 py-2 font-oswald text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-95 select-none"
    >
      <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'} text-xs`} />
      {copied ? 'Copiado!' : 'Copiar Código'}
    </button>
  );
}

export default function OrderDetailPage({ params }) {
  const resolvedParams = use(params);
  
  const searchId = `#${resolvedParams.id}`; 
  const { orders } = useOrders();
  
  const order = orders.find(o => o.id === searchId);

  if (!order) {
    return (
      <div className="w-full max-w-6xl mx-auto px-6 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <i className="fa-solid fa-box-open text-4xl text-gray-300 mb-6"></i>
        <h1 className="font-halis text-3xl uppercase tracking-tighter mb-4">Pedido não encontrado</h1>
        <p className="font-acumin text-brand-gray mb-8">O pedido {searchId} não existe ou não pertence a esta conta.</p>
        <Link href="/account" className="bg-black text-white px-8 py-3 font-oswald text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors">
          Voltar para Minha Conta
        </Link>
      </div>
    );
  }

  const subtotal = order.items.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const discount = order.coupon ? subtotal * (order.coupon.discountPercent / 100) : 0;
  const paymentLabel = order.payment?.method === 'credit' 
    ? `Cartão •••• ${order.payment.card?.number?.replace(/\s/g, '').slice(-4) || '????'} (${order.payment.card?.installments})` 
    : order.payment?.method === 'pix' ? 'Pix' : 'Boleto Bancário';

  const estimatedDays = parseInt(order.shipping?.days?.replace(/\D/g, '').slice(-2) || "10");
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + estimatedDays);
  const formattedDelivery = deliveryDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase().replace('.', '');

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-16 md:py-24">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <div className="mb-16">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 font-inconsolata text-xs text-brand-gray uppercase tracking-widest hover:text-black transition-colors mb-8 group"
        >
          <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform" />
          Voltar para Minha Conta
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black pb-8">
          <div>
            <p className="font-inconsolata text-xs text-brand-gray uppercase tracking-widest mb-2">Detalhes do Pedido</p>
            <h1
              className="font-oswald uppercase leading-none text-black"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.02em' }}
            >
              {order.id}
            </h1>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 pb-2">
            <div className={`px-4 py-1.5 font-oswald text-xs uppercase tracking-widest ${
              order.status === 'Entregue'
                ? 'bg-black text-white'
                : 'border border-black text-black'
            }`}>
              {order.status}
            </div>
            <p className="font-inconsolata text-xs text-brand-gray">Realizado em {order.date}</p>
          </div>
        </div>
      </div>

      {/* ── GRID PRINCIPAL ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

        {/* ── COLUNA ESQUERDA ── */}
        <div className="lg:col-span-7 flex flex-col gap-16">

          {/* Rastreio */}
          <section>
            <h2 className="font-oswald text-xs uppercase tracking-[0.3em] text-brand-gray mb-8 flex items-center gap-3">
              <span className="flex-1 h-px bg-gray-100" />
              Rastreamento
              <span className="flex-1 h-px bg-gray-100" />
            </h2>

            <div className="bg-gray-50 border border-gray-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="font-inconsolata text-[10px] text-brand-gray uppercase tracking-widest">Código de Rastreio</p>
                <p className="font-oswald text-xl tracking-widest mt-1">{order.trackingCode}</p>
                <p className="font-acumin text-xs text-brand-gray mt-1">{order.shipping?.label || 'Correios PAC'}</p>
              </div>
              
              {/* LÓGICA CONDICIONAL: Só exibe se NÃO for "Aguardando envio" */}
              {order.trackingCode !== 'Aguardando envio' && (
                <div className="flex flex-col gap-2 items-start md:items-end">
                  <CopyButton text={order.trackingCode} />
                  <a
                    href={`https://www.correios.com.br/rastreamento/${order.trackingCode.replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-inconsolata text-[10px] uppercase tracking-widest underline text-brand-gray hover:text-black transition-colors"
                  >
                    Rastrear no site dos Correios →
                  </a>
                </div>
              )}
            </div>

            <div className="pl-2">
              <StatusTracker currentStatus={order.status} />
            </div>

            {order.status !== 'Entregue' && (
              <div className="mt-2 border-l-2 border-black pl-4">
                <p className="font-inconsolata text-xs text-brand-gray uppercase tracking-widest">Previsão de entrega</p>
                <p className="font-oswald text-lg mt-0.5">{formattedDelivery}</p>
              </div>
            )}
          </section>

          {/* Itens do Pedido */}
          <section>
            <h2 className="font-oswald text-xs uppercase tracking-[0.3em] text-brand-gray mb-8 flex items-center gap-3">
              <span className="flex-1 h-px bg-gray-100" />
              Itens ({order.items.length})
              <span className="flex-1 h-px bg-gray-100" />
            </h2>

            <div className="flex flex-col divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={`${item.slug}-${item.size}`} className="flex gap-6 py-6 group">
                  <div
                    className="w-20 h-24 flex-shrink-0 border border-gray-100 bg-center bg-no-repeat bg-contain group-hover:border-black transition-all duration-300"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="flex flex-1 justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <p className="font-inconsolata text-[10px] text-brand-gray uppercase tracking-widest">{item.type || 'Camiseta Heyssy'}</p>
                      <p className="font-oswald text-lg uppercase tracking-tight leading-tight">{item.name}</p>
                      <div className="flex gap-3 mt-1">
                        <span className="border border-gray-200 px-2 py-0.5 font-inconsolata text-[10px] uppercase">
                          Tam. {item.size}
                        </span>
                        <span className="border border-gray-200 px-2 py-0.5 font-inconsolata text-[10px] uppercase">
                          Qtd. {item.quantity}
                        </span>
                      </div>
                    </div>
                    <p className="font-play font-bold text-lg">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── COLUNA DIREITA ── */}
        <div className="lg:col-span-5 flex flex-col gap-8">

          {/* Endereço de Entrega */}
          <div className="border border-gray-100 p-8">
            <h3 className="font-oswald text-xs uppercase tracking-[0.3em] text-brand-gray mb-6 flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-[10px]" />
              Endereço de Entrega
            </h3>
            <div className="flex flex-col gap-1 font-acumin">
              <p className="font-bold text-black">{order.address?.name}</p>
              <p className="text-sm text-brand-gray">{order.address?.street}, {order.address?.number}</p>
              {order.address?.complement && (
                <p className="text-sm text-brand-gray">{order.address?.complement}</p>
              )}
              <p className="text-sm text-brand-gray">{order.address?.neighborhood}</p>
              <p className="text-sm text-brand-gray">{order.address?.city} — {order.address?.state}</p>
              <p className="text-sm text-brand-gray mt-1 font-inconsolata text-[10px] uppercase">CEP {order.address?.cep}</p>
            </div>
          </div>

          {/* Pagamento */}
          <div className="border border-gray-100 p-8">
            <h3 className="font-oswald text-xs uppercase tracking-[0.3em] text-brand-gray mb-6 flex items-center gap-2">
              <i className="fa-solid fa-credit-card text-[10px]" />
              Pagamento
            </h3>
            <div className="flex flex-col gap-2 font-acumin">
              <p className="text-sm text-black font-bold uppercase tracking-wide">{paymentLabel}</p>
            </div>
          </div>

          {/* Resumo de Valores */}
          <div className="bg-black text-white p-8">
            <h3 className="font-oswald text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">
              Resumo do Pedido
            </h3>
            <div className="flex flex-col gap-3 font-acumin text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Frete</span>
                <span>R$ {(order.shipping?.price || 0).toFixed(2).replace('.', ',')}</span>
              </div>
              {order.coupon && (
                <div className="flex justify-between text-green-400">
                  <span>Desconto ({order.coupon.code})</span>
                  <span>− R$ {discount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="border-t border-white/10 pt-4 mt-2 flex justify-between items-baseline">
                <span className="font-oswald uppercase tracking-widest text-xs text-gray-400">Total Pago</span>
                <span className="font-play font-bold text-2xl">R$ {order.total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>

          {/* Suporte */}
          <div className="border border-dashed border-gray-300 p-6 flex flex-col gap-3">
            <p className="font-oswald text-xs uppercase tracking-widest text-brand-gray">Problema com o pedido?</p>
            <a
              href={`https://wa.me/5519996833077?text=Olá,%20preciso%20de%20ajuda%20com%20meu%20pedido%20${order.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-oswald text-sm uppercase tracking-widest underline hover:no-underline transition-all"
            >
              <i className="fa-brands fa-whatsapp" />
              Falar com Suporte
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}