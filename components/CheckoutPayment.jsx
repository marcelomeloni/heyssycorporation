'use client';

import { useState } from 'react';
import { FieldLabel, TextInput, SectionTitle, NavButtons } from './CheckoutUI';

const METHODS = [
  { id: 'credit', label: 'Cartão de Crédito', icon: 'fa-credit-card' },
  { id: 'pix', label: 'Pix', icon: 'fa-qrcode' },
  { id: 'boleto', label: 'Boleto', icon: 'fa-barcode' },
];

function formatCard(v) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(v) {
  return v.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2');
}

export function CheckoutPayment({ initial, onNext, onBack }) {
  const [method, setMethod] = useState(initial?.method ?? 'credit');
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    installments: '1',
    ...initial?.card,
  });

  const setC = (patch) => setCard((c) => ({ ...c, ...patch }));

  const handleNext = () => {
    onNext({ method, card: method === 'credit' ? card : null });
  };

  return (
    <div>
      <SectionTitle icon="fa-credit-card">Pagamento</SectionTitle>

      {/* Method selector */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {METHODS.map((m) => {
          const active = method === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`flex flex-col items-center gap-2 p-4 border-2 transition-all duration-200 ${
                active ? 'border-black bg-black text-white' : 'border-gray-100 hover:border-gray-300 text-brand-gray'
              }`}
            >
              <i className={`fa-solid ${m.icon} text-lg`} />
              <span className="font-oswald text-[10px] uppercase tracking-widest">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Credit card form */}
      {method === 'credit' && (
        <div className="flex flex-col gap-5">
          {/* Visual card */}
          <div className="relative w-full h-44 bg-black text-white p-6 flex flex-col justify-between overflow-hidden select-none">
            {/* Decorative circles */}
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-white/10" />
            <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full border border-white/10" />
            <div className="absolute right-4 bottom-4 w-20 h-20 rounded-full border border-white/5" />

            <div className="flex justify-between items-start relative z-10">
              <i className="fa-brands fa-cc-visa text-3xl opacity-80" />
              <span className="font-inconsolata text-[10px] uppercase tracking-widest opacity-50">crédito</span>
            </div>
            <div className="flex flex-col gap-2 relative z-10">
              <p className="font-inconsolata text-xl tracking-[0.25em]">
                {card.number || '•••• •••• •••• ••••'}
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-inconsolata text-[9px] uppercase opacity-50 tracking-widest">Nome</p>
                  <p className="font-oswald text-sm tracking-wider uppercase">
                    {card.name || 'SEU NOME'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-inconsolata text-[9px] uppercase opacity-50 tracking-widest">Validade</p>
                  <p className="font-inconsolata text-sm">{card.expiry || 'MM/AA'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fields */}
          <div>
            <FieldLabel>Número do Cartão</FieldLabel>
            <TextInput
              value={card.number}
              onChange={(e) => setC({ number: formatCard(e.target.value) })}
              placeholder="0000 0000 0000 0000"
              inputMode="numeric"
            />
          </div>
          <div>
            <FieldLabel>Nome no Cartão</FieldLabel>
            <TextInput
              value={card.name}
              onChange={(e) => setC({ name: e.target.value.toUpperCase() })}
              placeholder="COMO IMPRESSO NO CARTÃO"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>Validade</FieldLabel>
              <TextInput
                value={card.expiry}
                onChange={(e) => setC({ expiry: formatExpiry(e.target.value) })}
                placeholder="MM/AA"
                inputMode="numeric"
              />
            </div>
            <div>
              <FieldLabel>CVV</FieldLabel>
              <TextInput
                value={card.cvv}
                onChange={(e) => setC({ cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                placeholder="•••"
                inputMode="numeric"
              />
            </div>
          </div>
          <div>
            <FieldLabel>Parcelas</FieldLabel>
            <select
              value={card.installments}
              onChange={(e) => setC({ installments: e.target.value })}
              className="w-full border border-gray-200 px-4 py-3 font-acumin text-sm focus:border-black outline-none bg-white"
            >
              <option value="1">1x sem juros</option>
              <option value="2">2x sem juros</option>
              <option value="3">3x sem juros</option>
              <option value="6">6x com juros</option>
              <option value="12">12x com juros</option>
            </select>
          </div>
        </div>
      )}

      {/* Pix */}
      {method === 'pix' && (
        <div className="border border-dashed border-gray-300 p-8 flex flex-col items-center gap-4 text-center">
          <i className="fa-solid fa-qrcode text-4xl text-brand-gray" />
          <div>
            <p className="font-oswald uppercase tracking-widest text-sm">Pagamento via Pix</p>
            <p className="font-acumin text-xs text-brand-gray mt-2 leading-relaxed">
              O QR Code será gerado na próxima etapa após confirmar o pedido.<br />
              Aprovação em segundos, 24h por dia.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-100 px-6 py-2 font-inconsolata text-xs uppercase tracking-widest text-brand-gray">
            Validade: 30 minutos
          </div>
        </div>
      )}

      {/* Boleto */}
      {method === 'boleto' && (
        <div className="border border-dashed border-gray-300 p-8 flex flex-col items-center gap-4 text-center">
          <i className="fa-solid fa-barcode text-4xl text-brand-gray" />
          <div>
            <p className="font-oswald uppercase tracking-widest text-sm">Pagamento via Boleto</p>
            <p className="font-acumin text-xs text-brand-gray mt-2 leading-relaxed">
              O boleto será gerado após confirmar o pedido.<br />
              Aprovação em até 3 dias úteis após o pagamento.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-100 px-6 py-2 font-inconsolata text-xs uppercase tracking-widest text-brand-gray">
            Vencimento: 2 dias corridos
          </div>
        </div>
      )}

      <NavButtons onBack={onBack} onNext={handleNext} nextLabel="Revisar Pedido →" />
    </div>
  );
}