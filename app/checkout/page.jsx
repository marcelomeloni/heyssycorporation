'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Componentes
import { CheckoutStepIndicator } from '@/components/CheckoutStepIndicator';
import { CheckoutAddress } from '@/components/CheckoutAddress';
import { CheckoutShipping } from '@/components/CheckoutShipping';
import { CheckoutPayment } from '@/components/CheckoutPayment';
import { CheckoutReview } from '@/components/CheckoutReview';
import { CheckoutSuccess } from '@/components/CheckoutSuccess';
import { CheckoutOrderSummary } from '@/components/CheckoutOrderSummary';

// Contextos
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrdersContext';
import { useAuth } from '@/contexts/AuthContext';

export const STEPS = ['Endereço', 'Envio', 'Pagamento', 'Revisão'];

export default function CheckoutPage() {
  const { cartItems, cartTotal, finalTotal, appliedCoupon, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { currentUser } = useAuth(); // Pra atrelar o pedido ao cara logado

  const [currentStep, setCurrentStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  // NOVO: Guarda os dados FINAIS do pedido para a tela de sucesso
  const [finalOrderData, setFinalOrderData] = useState(null);

  const [checkoutData, setCheckoutData] = useState({
    address: null,
    shipping: null,
    payment: null,
  });

  const next = (stepData) => {
    setCheckoutData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const back = () => {
    setCurrentStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Aqui acontece a mágica de criar o pedido real no sistema
  const handleConfirm = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      // Cria os dados finais do pedido
      const totalAmount = finalTotal + (checkoutData.shipping?.price || 0);
      const newOrderData = {
        userEmail: currentUser?.email || checkoutData.address.email,
        items: cartItems, // <-- Copia os itens do carrinho antes de limpar
        total: totalAmount, // <-- Copia o total exato
        shipping: checkoutData.shipping,
        address: checkoutData.address,
        payment: checkoutData.payment,
        coupon: appliedCoupon
      };

      // 1. Salva no Dashboard de Pedidos (OrdersContext)
      const novoIdGerado = addOrder(newOrderData); 
      setGeneratedOrderId(novoIdGerado); // Guarda o ID gerado pro Success

      // 2. Guarda o pedido no estado local para a tela de Sucesso exibir
      setFinalOrderData(newOrderData);

      // 3. Limpa o carrinho
      clearCart();

      // 4. Mostra a tela de sucesso
      setIsProcessing(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2200);
  };

  if (isSuccess && finalOrderData) {
    // Agora passamos o finalOrderData com TUDO dentro (itens, total, etc)
    return <CheckoutSuccess orderId={generatedOrderId} data={finalOrderData} />;
  }

  // Se a pessoa acessar o checkout sem itens
  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="font-oswald uppercase tracking-widest text-brand-gray mb-4">Seu carrinho está vazio.</p>
        <Link href="/shop" className="bg-black text-white px-8 py-3 font-oswald text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors">Voltar para a Loja</Link>
      </div>
    );
  }

  // O total que aparece na tela e será cobrado
  const total = finalTotal + (checkoutData.shipping?.price || 0);

  return (
    <div className="min-h-screen bg-white">
     

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="mb-12">
          <CheckoutStepIndicator steps={STEPS} current={currentStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            {currentStep === 0 && (
              <CheckoutAddress
                initial={checkoutData.address}
                onNext={(data) => next({ address: data })}
              />
            )}
            {currentStep === 1 && (
              <CheckoutShipping
                initial={checkoutData.shipping}
                onNext={(data) => next({ shipping: data })}
                onBack={back}
              />
            )}
            {currentStep === 2 && (
              <CheckoutPayment
                initial={checkoutData.payment}
                onNext={(data) => next({ payment: data })}
                onBack={back}
              />
            )}
            {currentStep === 3 && (
              <CheckoutReview
                data={checkoutData}
                total={total}
                shippingCost={checkoutData.shipping?.price || 0}
                subtotal={cartTotal}
                onConfirm={handleConfirm}
                onBack={back}
                isProcessing={isProcessing}
              />
            )}
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <CheckoutOrderSummary shipping={checkoutData.shipping} />
          </div>
        </div>
      </div>
    </div>
  );

}
