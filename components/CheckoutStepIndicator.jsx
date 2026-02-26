'use client';

export function CheckoutStepIndicator({ steps, current }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              {/* Circle */}
              <div className={`w-8 h-8 flex items-center justify-center border-2 transition-all duration-500 text-xs font-oswald ${
                done
                  ? 'bg-black border-black text-white'
                  : active
                  ? 'bg-white border-black text-black font-bold'
                  : 'bg-white border-gray-200 text-gray-300'
              }`}>
                {done ? <i className="fa-solid fa-check text-[10px]" /> : i + 1}
              </div>
              {/* Label */}
              <span className={`font-inconsolata text-[10px] uppercase tracking-widest whitespace-nowrap ${
                active ? 'text-black font-bold' : done ? 'text-black' : 'text-gray-300'
              }`}>
                {step}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className={`w-16 md:w-24 h-[2px] mb-5 mx-1 transition-all duration-500 ${
                i < current ? 'bg-black' : 'bg-gray-100'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}