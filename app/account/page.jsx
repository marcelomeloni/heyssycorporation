'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrdersContext'; 
import { EditAccountModal } from '@/components/EditAccountModal';

export default function AccountPage() {
  const router = useRouter();
  const { currentUser, updateUser } = useAuth();
  const { getUserOrders } = useOrders();

  // Estados locais
  const [userData, setUserData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [myOrders, setMyOrders] = useState([]);

  // Verifica se o usuário está logado e busca os pedidos reais
  useEffect(() => {
    if (!currentUser) {
      router.push('/login'); 
    } else {
      setUserData(currentUser);
      setMyOrders(getUserOrders(currentUser.email));
    }
  }, [currentUser, router, getUserOrders]);

  // Previne renderização vazia
  if (!userData) return <div className="min-h-screen bg-white"></div>;

  const defaultAddress = userData.addresses?.find(a => a.isDefault)?.text || 'Nenhum endereço cadastrado';

  // Função para salvar as edições do Modal
  const handleSave = (newData) => {
    setUserData(newData);
    setIsEditModalOpen(false);
    
    if (updateUser) {
       updateUser(newData); 
    } else {
       localStorage.setItem('heyssy_logged_in', JSON.stringify(newData));
       const users = JSON.parse(localStorage.getItem('heyssy_users') || '[]');
       const updatedUsers = users.map(u => u.email === newData.email ? { ...u, ...newData } : u);
       localStorage.setItem('heyssy_users', JSON.stringify(updatedUsers));
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-16 md:py-24">
      
      {/* Modal de Edição */}
      {isEditModalOpen && (
        <EditAccountModal
          user={userData}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Header do Perfil */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-100 pb-10 mb-12 gap-6">
        <div>
          <h1 className="font-halis text-4xl uppercase tracking-tighter text-brand-black">
            Minha Conta
          </h1>
          <p className="font-acumin text-brand-gray mt-2">
            Bem-vindo de volta, <span className="text-black font-bold">{userData.name}</span>
          </p>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem('heyssy_logged_in');
            window.location.href = '/login'; 
          }}
          className="text-xs font-oswald uppercase tracking-widest border border-black px-6 py-2 hover:bg-black hover:text-white transition-all"
        >
          Sair da Conta
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* Lado Esquerdo: Histórico de Pedidos */}
        <div className="lg:col-span-8">
          <h2 className="font-oswald text-xl uppercase tracking-widest mb-8 flex items-center gap-3">
            <i className="fa-solid fa-box-open text-sm"></i> Histórico de Pedidos
          </h2>

          {/* Renderização baseada nos pedidos reais do contexto */}
          {myOrders.length === 0 ? (
            <div className="bg-gray-50 p-12 text-center border border-dashed border-gray-200">
              <p className="font-acumin text-brand-gray">Você ainda não realizou nenhum pedido.</p>
              <Link href="/shop" className="inline-block mt-4 font-oswald text-sm uppercase underline">
                Ir para a loja
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {myOrders.map((order) => (
                <div key={order.id} className="border border-gray-100 p-6 hover:shadow-lg transition-shadow bg-white">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <span className="block font-inconsolata text-xs text-brand-gray uppercase">Pedido</span>
                      <span className="font-bold text-lg">{order.id}</span>
                    </div>
                    <div>
                      <span className="block font-inconsolata text-xs text-brand-gray uppercase">Data</span>
                      <span className="text-sm font-medium">{order.date}</span>
                    </div>
                    <div>
                      <span className="block font-inconsolata text-xs text-brand-gray uppercase">Status</span>
                      <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                        order.status === 'Entregue' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div>
                      <span className="block font-inconsolata text-xs text-brand-gray uppercase">Total</span>
                      <span className="font-play font-bold">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <Link
                      href={`/account/order/${order.id.replace('#', '')}`}
                      className="bg-black text-white px-6 py-3 font-oswald text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
                    >
                      Detalhes
                    </Link>
                  </div>
                  {order.trackingCode && (
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs font-acumin text-brand-gray">
                      <i className="fa-solid fa-truck-fast"></i>
                      Rastreio: <span className="text-black font-bold uppercase select-all">{order.trackingCode}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lado Direito: Info de Perfil & Suporte */}
        <div className="lg:col-span-4 flex flex-col gap-10">

          {/* Box: Dados Pessoais */}
          <div className="bg-gray-50 p-8">
            <h3 className="font-oswald text-lg uppercase tracking-widest mb-6">Seus Dados</h3>
            <div className="flex flex-col gap-4 font-acumin text-sm">
              <div>
                <span className="block text-[10px] text-brand-gray uppercase font-bold">E-mail</span>
                <span className="text-black">{userData.email}</span>
              </div>
              <div>
                <span className="block text-[10px] text-brand-gray uppercase font-bold">Endereço Padrão</span>
                <span className="text-black italic leading-tight">{defaultAddress}</span>
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-left text-xs underline uppercase font-bold mt-2 hover:text-brand-gray transition-colors"
              >
                Editar informações
              </button>
            </div>
          </div>

          {/* Box: Suporte Rápido */}
          <div className="border border-black p-8 flex flex-col gap-4">
            <h3 className="font-oswald text-lg uppercase tracking-widest">Precisa de ajuda?</h3>
            <p className="font-acumin text-xs text-brand-gray leading-relaxed">
              Dúvidas sobre trocas, devoluções ou atrasos na entrega? Fale com nosso suporte especializado.
            </p>
            <a
              href="https://wa.me/5519996833077"
              target="_blank"
              rel="noreferrer"
              className="bg-black text-white text-center py-4 font-oswald text-sm uppercase tracking-widest hover:bg-gray-800 transition-all"
            >
              Chamar no WhatsApp
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}