'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // Carrega os pedidos salvos no navegador ao iniciar
  useEffect(() => {
    const savedOrders = localStorage.getItem('heyssy_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Função para adicionar um novo pedido (agora retornando o ID gerado)
  const addOrder = (orderData) => {
    const newOrder = {
      id: `#${Math.floor(Math.random() * 90000) + 10000}`, // Gera um ID tipo #45821
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'Aprovado',
      trackingCode: 'Aguardando envio',
      ...orderData
    };

    const updatedOrders = [newOrder, ...orders]; // Coloca o novo primeiro
    setOrders(updatedOrders);
    localStorage.setItem('heyssy_orders', JSON.stringify(updatedOrders));

    return newOrder.id; // <-- RETORNO DO ID (Crucial para a tela de Sucesso do Checkout)
  };

  // Função para buscar apenas os pedidos do usuário logado
  const getUserOrders = (email) => {
    return orders.filter(order => order.userEmail === email);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, getUserOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);