'use client';

import { useState, useEffect } from 'react';
import { FieldLabel, TextInput, SectionTitle, NavButtons } from './CheckoutUI';
import { useAuth } from '@/contexts/AuthContext';

// ==========================================
// FUNÇÕES DE MÁSCARA (NATIVAS)
// ==========================================
const maskCEP = (value) => {
  return value
    .replace(/\D/g, '') // Remove tudo que não for dígito
    .replace(/(\d{5})(\d)/, '$1-$2') // Coloca o hífen depois do 5º dígito
    .slice(0, 9); // Limita o tamanho máximo
};

const maskPhone = (value) => {
  let v = value.replace(/\D/g, ''); // Remove tudo que não for dígito
  if (v.length <= 10) {
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2'); // (XX) X
    v = v.replace(/(\d{4})(\d)/, '$1-$2'); // (XX) XXXX-XXXX
  } else {
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2'); // (XX) X
    v = v.replace(/(\d{5})(\d)/, '$1-$2'); // (XX) XXXXX-XXXX
  }
  return v.slice(0, 15);
};

const maskCPF = (value) => {
  return value
    .replace(/\D/g, '') // Remove o que não é número
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após o 3º dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após o 6º dígito
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca traço antes dos últimos 2 dígitos
    .slice(0, 14); // Limita o tamanho máximo
};


export function CheckoutAddress({ initial, onNext }) {
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    cpf: '', // <-- Adicionado estado do CPF
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    ...initial,
  });

  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [errors, setErrors] = useState({});
  const [autoFilled, setAutoFilled] = useState(false);

  // ====== AUTO-PREENCHIMENTO ======
  useEffect(() => {
    if (currentUser && !autoFilled && !initial) {
      const defaultAddress = currentUser.addresses?.find(addr => addr.isDefault);
      
      let newFormData = {
        name: currentUser.name || '',
        email: currentUser.email || '',
      };

      if (defaultAddress && defaultAddress.details) {
        newFormData = {
          ...newFormData,
          cep: maskCEP(defaultAddress.details.cep || ''), // Aplica a máscara no carregamento também
          street: defaultAddress.details.logradouro || '',
          number: defaultAddress.details.numero || '',
          complement: defaultAddress.details.complemento || '',
          neighborhood: defaultAddress.details.bairro || '',
          city: defaultAddress.details.localidade || '',
          state: defaultAddress.details.uf || '',
        };
      }

      setForm((prev) => ({ ...prev, ...newFormData }));
      setAutoFilled(true);
    }
  }, [currentUser, autoFilled, initial]);

  // ====== BUSCA DE CEP ======
  useEffect(() => {
    const cepLimpo = form.cep?.replace(/\D/g, '') || '';
    if (cepLimpo.length === 8) fetchCep(cepLimpo);
  }, [form.cep]);

  const fetchCep = async (cep) => {
    setIsLoadingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        set({ 
          street: data.logradouro, 
          neighborhood: data.bairro, 
          city: data.localidade, 
          state: data.uf 
        });
      }
    } catch (e) {}
    finally { setIsLoadingCep(false); }
  };

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  // ====== VALIDAÇÃO ======
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim()) e.email = true;
    // Valida se o CPF não tá vazio e se tem os 14 caracteres com máscara
    if (!form.cpf.trim() || form.cpf.length < 14) e.cpf = true; 
    if (!form.phone.trim() || form.phone.length < 14) e.phone = true;
    if (!form.cep.trim() || form.cep.length < 9) e.cep = true;
    if (!form.street.trim()) e.street = true;
    if (!form.number.trim()) e.number = true;
    if (!form.city.trim()) e.city = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext(form);
  };

  // Handler genérico de campos
  const field = (key, label, props = {}) => (
    <div className="flex flex-col">
      <FieldLabel>{label}</FieldLabel>
      <TextInput
        value={form[key]}
        onChange={(e) => set({ [key]: e.target.value })}
        className={errors[key] ? '!border-red-400' : ''}
        {...props}
      />
      {errors[key] && <span className="text-[10px] text-red-500 mt-1 font-inconsolata">Campo obrigatório / inválido</span>}
    </div>
  );

  return (
    <div>
      <SectionTitle icon="fa-location-dot">Endereço de Entrega</SectionTitle>

      {currentUser && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-100 flex items-center gap-3">
          <i className="fa-solid fa-bolt text-black text-lg"></i>
          <div>
            <p className="font-oswald uppercase tracking-widest text-sm text-black">Express Checkout</p>
            <p className="font-acumin text-xs text-brand-gray">Seus dados salvos foram carregados automaticamente.</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6">
        
        {/* Dados pessoais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field('name', 'Nome Completo', { placeholder: 'Seu nome' })}
          {field('email', 'E-mail', { placeholder: 'seu@email.com', type: 'email' })}
        </div>
        
        {/* CPF e Celular com Máscaras aplicadas direto no onChange inline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <FieldLabel>CPF</FieldLabel>
            <TextInput
              value={form.cpf}
              onChange={(e) => set({ cpf: maskCPF(e.target.value) })}
              className={errors.cpf ? '!border-red-400' : ''}
              placeholder="000.000.000-00"
            />
            {errors.cpf && <span className="text-[10px] text-red-500 mt-1 font-inconsolata">CPF inválido</span>}
          </div>

          <div className="flex flex-col">
            <FieldLabel>Celular / WhatsApp</FieldLabel>
            <TextInput
              value={form.phone}
              onChange={(e) => set({ phone: maskPhone(e.target.value) })}
              className={errors.phone ? '!border-red-400' : ''}
              placeholder="(11) 99999-9999"
              type="tel"
            />
            {errors.phone && <span className="text-[10px] text-red-500 mt-1 font-inconsolata">Telefone inválido</span>}
          </div>
        </div>

        {/* Endereço */}
        <div className="border-t border-gray-100 pt-6">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {/* Campo de CEP com máscara */}
            <div className="relative flex flex-col">
              <FieldLabel>CEP</FieldLabel>
              <TextInput
                value={form.cep}
                onChange={(e) => set({ cep: maskCEP(e.target.value) })}
                placeholder="00000-000"
                className={errors.cep ? '!border-red-400' : ''}
              />
              {isLoadingCep && (
                <i className="fa-solid fa-circle-notch fa-spin absolute right-3 bottom-3.5 text-gray-400 text-xs" />
              )}
              {errors.cep && <span className="text-[10px] text-red-500 mt-1 font-inconsolata">CEP inválido</span>}
            </div>
            
            <div className="col-span-2 md:col-span-3">
              {field('street', 'Logradouro', { placeholder: 'Rua, Av...' })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {field('number', 'Número', { placeholder: '123' })}
            {field('complement', 'Complemento', { placeholder: 'Apto, Bloco...' })}
            <div className="col-span-2">
              {field('neighborhood', 'Bairro', { placeholder: 'Bairro' })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              {field('city', 'Cidade')}
            </div>
            <div className="flex flex-col">
              <FieldLabel>Estado</FieldLabel>
              <TextInput
                value={form.state}
                onChange={(e) => set({ state: e.target.value.toUpperCase() })} // Força o estado a ficar maiúsculo (SP, RJ)
                maxLength={2}
                placeholder="SP"
              />
            </div>
          </div>

        </div>
      </div>

      <NavButtons onNext={handleNext} nextLabel="Continuar para Envio →" />
    </div>
  );
}