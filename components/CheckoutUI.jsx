'use client';

export function FieldLabel({ children }) {
  return (
    <label className="block text-[10px] font-bold uppercase text-brand-gray tracking-widest mb-1">
      {children}
    </label>
  );
}

export function TextInput({ className = '', ...props }) {
  return (
    <input
      className={`w-full border border-gray-200 px-4 py-3 font-acumin text-sm focus:border-black outline-none transition-colors bg-white ${className}`}
      {...props}
    />
  );
}

export function SectionTitle({ icon, children }) {
  return (
    <h2 className="font-oswald text-xl uppercase tracking-widest mb-8 flex items-center gap-3">
      {icon && <i className={`fa-solid ${icon} text-sm`} />}
      {children}
    </h2>
  );
}

export function NavButtons({ onBack, onNext, nextLabel = 'Continuar', isProcessing = false, disableNext = false }) {
  return (
    <div className="flex gap-4 mt-10 pt-8 border-t border-gray-100">
      {onBack && (
        <button
          onClick={onBack}
          className="px-8 border border-gray-200 py-4 font-oswald uppercase tracking-widest hover:bg-gray-50 transition-all text-xs"
        >
          Voltar
        </button>
      )}
      <button
        onClick={onNext}
        disabled={isProcessing || disableNext}
        className="flex-1 bg-black text-white py-4 font-oswald uppercase tracking-widest hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isProcessing ? (
          <>
            <i className="fa-solid fa-circle-notch fa-spin text-sm" />
            Processando...
          </>
        ) : (
          nextLabel
        )}
      </button>
    </div>
  );
}