'use client';

import { useState } from 'react';
import { SectionTitle, NavButtons } from './CheckoutUI';

const SHIPPING_OPTIONS = [
  {
    id: 'pac',
    label: 'PAC — Correios',
    days: '8 a 12 dias úteis',
    price: 19.9,
    icon: 'fa-box',
  },
  {
    id: 'sedex',
    label: 'SEDEX — Correios',
    days: '2 a 4 dias úteis',
    price: 34.9,
    icon: 'fa-truck-fast',
  },
  {
    id: 'sedex10',
    label: 'SEDEX 10',
    days: 'Até 10h do próximo dia útil',
    price: 54.9,
    icon: 'fa-bolt',
  },
];

export function CheckoutShipping({ initial, onNext, onBack }) {
  const [selected, setSelected] = useState(initial?.id ?? null);
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (!selected) { setError(true); return; }
    const option = SHIPPING_OPTIONS.find((o) => o.id === selected);
    onNext(option);
  };

  return (
    <div>
      <SectionTitle icon="fa-truck">Método de Envio</SectionTitle>

      <div className="flex flex-col gap-3">
        {SHIPPING_OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => { setSelected(opt.id); setError(false); }}
              className={`flex items-center justify-between p-6 border-2 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-black bg-black text-white'
                  : 'border-gray-100 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-10 h-10 flex items-center justify-center border ${
                  isSelected ? 'border-white/20 text-white' : 'border-gray-200 text-brand-gray'
                }`}>
                  <i className={`fa-solid ${opt.icon} text-sm`} />
                </div>
                <div>
                  <p className={`font-oswald uppercase tracking-wider text-sm ${isSelected ? 'text-white' : 'text-black'}`}>
                    {opt.label}
                  </p>
                  <p className={`font-acumin text-xs mt-0.5 ${isSelected ? 'text-gray-300' : 'text-brand-gray'}`}>
                    {opt.days}
                  </p>
                </div>
              </div>
              <p className={`font-play font-bold text-lg ${isSelected ? 'text-white' : 'text-black'}`}>
                R$ {opt.price.toFixed(2).replace('.', ',')}
              </p>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-3 font-inconsolata text-xs text-red-500 uppercase tracking-widest">
          Selecione um método de envio.
        </p>
      )}

      <NavButtons onBack={onBack} onNext={handleNext} nextLabel="Continuar para Pagamento →" />
    </div>
  );
}