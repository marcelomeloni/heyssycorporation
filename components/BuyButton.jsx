'use client';

/**
 * @param {{ disabled?: boolean }} props
 */
export function BuyButton({ disabled = false }) {
  const handleBuy = () => {
    if (disabled) return;
    // TODO: integrate with payment / cart logic
    alert('Adicionado ao carrinho!');
  };

  return (
    <button
      onClick={handleBuy}
      disabled={disabled}
      className={`px-6 py-3 font-play font-bold tracking-widest uppercase text-sm transition-all duration-200 ${
        disabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-brand-black text-white hover:bg-gray-800 active:scale-95'
      }`}
    >
      {disabled ? 'Indisponível' : 'Comprar'}
    </button>
  );
}