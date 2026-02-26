'use client';

import { SectionTitle, NavButtons } from './CheckoutUI';
import { useCart } from '@/contexts/CartContext';

function ReviewBlock({ title, icon, children }) {
  return (
    <div className="border border-gray-100 p-6">
      <p className="font-inconsolata text-[10px] uppercase tracking-[0.3em] text-brand-gray mb-4 flex items-center gap-2">
        <i className={`fa-solid ${icon} text-[10px]`} />
        {title}
      </p>
      {children}
    </div>
  );
}

export function CheckoutReview({ data, total, subtotal, shippingCost, onConfirm, onBack, isProcessing }) {
  const { cartItems, appliedCoupon, discountValue } = useCart();
  const { address, shipping, payment } = data;

  const paymentLabel =
    payment?.method === 'credit'
      ? `Cartão •••• ${payment.card?.number?.replace(/\s/g, '').slice(-4) || '????'} — ${payment.card?.installments}x`
      : payment?.method === 'pix'
      ? 'Pix'
      : 'Boleto Bancário';

  return (
    <div>
      <SectionTitle icon="fa-list-check">Revisar Pedido</SectionTitle>

      <div className="flex flex-col gap-4">
        {/* Address */}
        <ReviewBlock title="Endereço de Entrega" icon="fa-location-dot">
          <div className="font-acumin text-sm flex flex-col gap-0.5">
            <p className="font-bold">{address?.name}</p>
            <p className="text-brand-gray">{address?.street}, {address?.number} {address?.complement}</p>
            <p className="text-brand-gray">{address?.neighborhood} — {address?.city}/{address?.state}</p>
            <p className="text-brand-gray">CEP {address?.cep}</p>
          </div>
        </ReviewBlock>

        {/* Shipping */}
        <ReviewBlock title="Método de Envio" icon="fa-truck">
          <p className="font-oswald uppercase tracking-wider text-sm">{shipping?.label}</p>
          <p className="font-acumin text-xs text-brand-gray mt-1">{shipping?.days}</p>
        </ReviewBlock>

        {/* Payment */}
        <ReviewBlock title="Pagamento" icon="fa-credit-card">
          <p className="font-oswald uppercase tracking-wider text-sm">{paymentLabel}</p>
        </ReviewBlock>

        {/* Items Reais */}
        <ReviewBlock title="Itens do Pedido" icon="fa-shirt">
          <div className="flex flex-col divide-y divide-gray-50">
            {cartItems.map((item) => (
              <div key={`${item.slug}-${item.size}`} className="flex items-center gap-4 py-3">
                <div
                  className="w-12 h-14 flex-shrink-0 border border-gray-100 bg-center bg-no-repeat bg-contain"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="flex-1">
                  <p className="font-oswald text-sm uppercase tracking-tight">{item.name}</p>
                  <p className="font-inconsolata text-[10px] text-brand-gray uppercase">
                    Tam. {item.size} · Qtd. {item.quantity}
                  </p>
                </div>
                <p className="font-play font-bold text-sm">
                  R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                </p>
              </div>
            ))}
          </div>
        </ReviewBlock>

        {/* Totals */}
        <div className="bg-black text-white p-6 flex flex-col gap-3">
          <div className="flex justify-between font-acumin text-sm">
            <span className="text-gray-400">Subtotal</span>
            <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </div>

          {appliedCoupon && (
            <div className="flex justify-between font-acumin text-sm text-green-400 font-bold">
              <span>Desconto</span>
              <span>- R$ {discountValue.toFixed(2).replace('.', ',')}</span>
            </div>
          )}

          <div className="flex justify-between font-acumin text-sm">
            <span className="text-gray-400">Frete ({shipping?.label})</span>
            <span>R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="border-t border-white/10 pt-3 flex justify-between items-baseline">
            <span className="font-oswald uppercase tracking-widest text-xs text-gray-400">Total</span>
            <span className="font-play font-bold text-2xl">
              R$ {total.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-brand-gray">
        <i className="fa-solid fa-lock text-xs" />
        <span className="font-inconsolata text-[10px] uppercase tracking-widest">
          Compra protegida por criptografia SSL
        </span>
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onConfirm}
        nextLabel="Confirmar Pedido"
        isProcessing={isProcessing}
      />
    </div>
  );
}