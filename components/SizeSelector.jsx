'use client';

import { useState } from 'react';

/**
 * @param {{ sizes: string[], stock: Record<string, boolean>, onChange: (size: string) => void }} props
 */
export function SizeSelector({ sizes, stock = {}, onChange }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (size) => {
    if (!stock[size]) return; // out of stock
    setSelected(size);
    onChange?.(size);
  };

  return (
    <div className="mt-5">
      <p className="font-inconsolata font-semibold text-sm uppercase tracking-wider mb-2">
        Tamanho
      </p>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => {
          const inStock = stock[size] !== false; // default true if not specified
          return (
            <button
              key={size}
              onClick={() => handleSelect(size)}
              className={`size-btn ${selected === size ? 'active' : ''} ${
                !inStock ? 'disabled' : ''
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}