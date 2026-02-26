# HEYSSY CORPORATION

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-blue?style=for-the-badge&logo=tailwind-css)
![React Context](https://img.shields.io/badge/React-Context_API-61DAFB?style=for-the-badge&logo=react)

**Heyssy Corporation** é uma plataforma de e-commerce de alto nível voltada para o nicho de moda underground. O projeto foca em uma experiência de usuário (UX) fluida, design brutalista e um fluxo completo de compra, operando inteiramente no **Front-End** através de estados complexos e persistência local.

---

## 🔥 Destaques do Projeto

- **Design Editorial & Brutalista:** Estética focada em alto contraste, tipografia pesada e layouts assimétricos inspirados em revistas de moda contemporâneas.
- **Arquitetura Front-State (Demo Ready):** Sistema 100% funcional sem dependência inicial de banco de dados externo, ideal para apresentações técnicas e validação de fluxo.

---

## 🚀 Funcionalidades Principais

### 🛒 Gestão de Carrinho (`CartContext`)
- Adição dinâmica de produtos com persistência e seleção de atributos (tamanhos).
- Sistema de cupom de desconto com cálculo em tempo real e feedback visual.
- Sidebar interativa para gerenciamento rápido de itens.

### 🔐 Autenticação Mock (`AuthContext`)
- Fluxo completo de Registro e Login simulado via `localStorage`.
- Proteção de rotas (redirecionamento automático de usuários não autenticados).
- Gerenciamento de perfil, sessão e endereços padrão.

### 📦 Sistema de Pedidos (`OrdersContext`)
- Geração de pedidos reais e únicos após o checkout bem-sucedido.
- Histórico de compras vinculado dinamicamente ao perfil do usuário logado.
- Rastreamento detalhado com status evolutivo (Aprovado, Preparação, Trânsito, Entregue).

### 💳 Checkout Inteligente
- **Integração ViaCEP:** Preenchimento automático de logradouro através de busca de CEP em tempo real.
- **Express Checkout:** Auto-preenchimento automático de dados para usuários autenticados.
- **Máscaras Nativas:** CPF, CEP e Celular formatados via Regex para garantir integridade dos dados sem bibliotecas externas pesadas.
- **Review Step:** Revisão final de itens, cálculos de frete e métodos de pagamento antes da confirmação.

---

## 🛠️ Stack Técnica

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Estado Global:** React Context API (Auth, Cart, Orders)
- **Notificações:** [React Hot Toast](https://react-hot-toast.com/) (Customizado para o tema Dark)
- **Ícones:** [Font Awesome 6](https://fontawesome.com/)
- **Animações:** Tailwind Animate + Transições CSS3 nativas

---

## 📁 Estrutura de Pastas
```text
├── app/                  # Rotas principais, páginas e layouts
├── components/           # Componentes modulares, UI e formulários
├── contexts/             # Gerenciamento de estado global (Business Logic)
├── lib/                  # Banco de dados estático e utilitários
└── public/               # Assets, imagens de produtos e ícones
```

---

## ⚙️ Instalação e Uso

**Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/heyssy-store.git
```

**Instale as dependências:**
```bash
npm install
```

**Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

---

## ⚠️ Disclaimer (Aviso Legal)

Este projeto é um **Portfólio Técnico de Demonstração**.

- Não existe um backend real processando pagamentos financeiros.
- Não são realizadas transações monetárias reais.
- Todos os dados (usuários e pedidos) são persistidos localmente no navegador (`localStorage`) para fins de simulação de experiência.

---

