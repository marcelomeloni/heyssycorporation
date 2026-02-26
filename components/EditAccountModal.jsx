'use client';

import { useState, useEffect } from 'react';

export function EditAccountModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    addresses: user.addresses || []
  });

  // Estado para o formulário de novo endereço
  const [addressForm, setAddressForm] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: ''
  });

  const [isLoadingCep, setIsLoadingCep] = useState(false);

  // Busca CEP automaticamente quando atinge 8 dígitos
  useEffect(() => {
    const cep = addressForm.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      handleFetchCep(cep);
    }
  }, [addressForm.cep]);

  const handleFetchCep = async (cep) => {
    setIsLoadingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      
      if (!data.erro) {
        setAddressForm(prev => ({
          ...prev,
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP", error);
    } finally {
      setIsLoadingCep(false);
    }
  };

  const addAddress = () => {
    const { cep, logradouro, numero, localidade, uf } = addressForm;
    if (!cep || !logradouro || !numero) return alert("Preencha os campos essenciais.");

    const fullText = `${logradouro}, ${numero}${addressForm.complemento ? ` (${addressForm.complemento})` : ''} - ${localidade},${uf}`;
    
    const updated = [
      ...formData.addresses,
      { 
        id: Date.now(), 
        text: fullText, 
        details: addressForm, // Guardamos o objeto completo para o banco de dados
        isDefault: formData.addresses.length === 0 
      }
    ];

    setFormData({ ...formData, addresses: updated });
    setAddressForm({ cep: '', logradouro: '', numero: '', complemento: '', bairro: '', localidade: '', uf: '' });
  };

  const removeAddress = (id) => {
    const updated = formData.addresses.filter(addr => addr.id !== id);
    if (updated.length > 0 && !updated.find(a => a.isDefault)) {
      updated[0].isDefault = true;
    }
    setFormData({ ...formData, addresses: updated });
  };

  const setDefault = (id) => {
    const updated = formData.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    setFormData({ ...formData, addresses: updated });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 flex flex-col gap-8 animate-in fade-in duration-300">
        
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <h2 className="font-halis text-2xl uppercase tracking-tighter">Configurações de Perfil</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black text-2xl transition-transform hover:rotate-90 duration-300">&times;</button>
        </div>

        {/* Informações Básicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase text-brand-gray tracking-widest">Nome Completo</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border border-gray-200 px-4 py-3 font-acumin focus:border-black outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1 opacity-60">
            <label className="text-[10px] font-bold uppercase text-brand-gray tracking-widest">E-mail</label>
            <input type="text" value={formData.email} disabled className="bg-gray-50 border border-gray-200 px-4 py-3 font-acumin cursor-not-allowed" />
          </div>
        </div>

        {/* Lista de Endereços Atuais */}
        <div className="flex flex-col gap-4">
          <label className="text-[10px] font-bold uppercase text-brand-gray tracking-widest">Endereços Salvos</label>
          <div className="flex flex-col gap-3">
            {formData.addresses.map((addr) => (
              <div key={addr.id} className={`border p-4 flex justify-between items-center transition-all ${addr.isDefault ? 'border-black bg-gray-50' : 'border-gray-100'}`}>
                <div className="flex flex-col gap-1">
                  <p className="font-acumin text-sm max-w-[350px]">{addr.text}</p>
                  {addr.isDefault && <span className="text-[9px] font-bold uppercase bg-black text-white px-2 py-0.5 w-fit">Principal</span>}
                </div>
                <div className="flex gap-4 items-center">
                  {!addr.isDefault && (
                    <button onClick={() => setDefault(addr.id)} className="text-[10px] uppercase font-bold underline hover:text-brand-gray">Principal</button>
                  )}
                  <button onClick={() => removeAddress(addr.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <i className="fa-solid fa-trash-can text-sm"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulário de Novo Endereço */}
        <div className="bg-gray-50 p-6 border border-gray-100 flex flex-col gap-4">
          <label className="text-[10px] font-bold uppercase text-brand-black tracking-widest">Adicionar Novo Endereço</label>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative">
              <input 
                type="text" placeholder="CEP" 
                value={addressForm.cep}
                onChange={(e) => setAddressForm({...addressForm, cep: e.target.value})}
                className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none"
              />
              {isLoadingCep && <i className="fa-solid fa-circle-notch fa-spin absolute right-2 top-3 text-gray-400 text-xs"></i>}
            </div>
            <input 
              type="text" placeholder="Logradouro" 
              value={addressForm.logradouro}
              onChange={(e) => setAddressForm({...addressForm, logradouro: e.target.value})}
              className="col-span-2 md:col-span-3 border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none"
            />
            <input 
              type="text" placeholder="Nº" 
              value={addressForm.numero}
              onChange={(e) => setAddressForm({...addressForm, numero: e.target.value})}
              className="border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none"
            />
            <input 
              type="text" placeholder="Compl." 
              value={addressForm.complemento}
              onChange={(e) => setAddressForm({...addressForm, complemento: e.target.value})}
              className="border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none"
            />
            <input 
              type="text" placeholder="Bairro" 
              value={addressForm.bairro}
              onChange={(e) => setAddressForm({...addressForm, bairro: e.target.value})}
              className="border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none"
            />
            <input 
              type="text" placeholder="Cidade/UF" 
              value={`${addressForm.localidade}${addressForm.uf ? `/${addressForm.uf}` : ''}`}
              readOnly
              className="bg-gray-100 border border-gray-200 px-3 py-2 text-sm cursor-not-allowed"
            />
          </div>
          
          <button 
            onClick={addAddress}
            className="w-full bg-white border border-black text-black py-3 font-oswald uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all active:scale-95"
          >
            Confirmar e Adicionar Endereço
          </button>
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-100">
          <button onClick={() => onSave(formData)} className="flex-1 bg-black text-white py-4 font-oswald uppercase tracking-widest hover:bg-gray-800 active:scale-[0.98] transition-all">Salvar Alterações</button>
          <button onClick={onClose} className="px-8 border border-gray-200 py-4 font-oswald uppercase tracking-widest hover:bg-gray-50 transition-all text-xs">Cancelar</button>
        </div>
      </div>
    </div>
  );
}