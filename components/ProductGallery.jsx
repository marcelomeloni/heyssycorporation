'use client';

import { useState } from 'react';

/**
 * @param {{ images: string[] }} props
 */
export function ProductGallery({ images }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className="w-full md:w-[410px] h-[400px] md:h-[440px] border border-gray-200 bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${active}')`, backgroundSize: 'contain' }}
      />

      {/* Thumbnails */}
      <div className="flex gap-2 flex-wrap md:justify-start justify-center">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(img)}
            className={`w-[80px] h-[80px] border object-cover transition-all ${
              active === img ? 'border-brand-black' : 'border-gray-200'
            }`}
            style={{ background: `url('${img}') center/cover no-repeat` }}
            aria-label={`Imagem ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}