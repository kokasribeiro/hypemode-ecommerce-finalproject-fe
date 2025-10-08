# HypeMode E-Commerce 🛍️

## Descrição

HypeMode é uma loja online de moda e estilo completa, desenvolvida com **React 19** (frontend) e **Node.js + Express + MySQL** (backend). A aplicação oferece uma experiência de compra moderna e profissional, com autenticação JWT, gerenciamento de carrinho persistente, sistema de pedidos completo e integração de pagamentos.

## 🚀 **API BACKEND INTEGRADA!**

Este projeto usa uma **API backend completa e profissional** pronta para produção!

✅ **[Migração Completa - MockAPI Removida](./MIGRATION_COMPLETE.md)**  
📖 **[Guia Completo da API](./MIGRAÇÃO_PARA_API.md)**

**Resumo das novas funcionalidades:**

- ✅ API RESTful com Node.js + Express + MySQL
- ✅ Autenticação JWT com roles (user/admin)
- ✅ Sistema de produtos com CRUD completo
- ✅ Carrinho persistente no banco de dados
- ✅ Sistema de pedidos e checkout
- ✅ Integração com Stripe para pagamentos
- ✅ Segurança (bcrypt, rate limiting, helmet)
- ✅ 15 produtos de exemplo incluídos

**Início rápido do backend:**

```bash
cd backend
npm install
npm run db:seed  # Popular banco de dados
npm run dev      # Iniciar servidor (porta 3000)
```

📚 **Documentação completa:** `backend/README.md` e `backend/SETUP.md`

## Requisitos Funcionais

- **Autenticação de Usuários:** Login e registro de usuários.
- **Gerenciamento de Produtos:** Listagem, busca e detalhes de produtos.
- **Carrinho de Compras:** Adição, remoção e atualização de itens.
- **SEO Otimizado:** Meta tags dinâmicas para cada página.
- **Responsividade:** Interface adaptável a diferentes dispositivos.

## Requisitos Não Funcionais

- **Performance:** Carregamento rápido e otimização de assets.
- **Segurança:** Proteção de rotas e dados sensíveis.
- **Acessibilidade:** Suporte a leitores de tela e navegação por teclado.
- **Compatibilidade:** Funcionamento em navegadores modernos.

## Bibliotecas Utilizadas

- **React 19:** Framework principal para construção da UI.
- **Vite:** Build tool para desenvolvimento rápido.
- **React Router DOM:** Gerenciamento de rotas.
- **React Hot Toast:** Notificações de sucesso/erro.
- **Axios:** Cliente HTTP para requisições.
- **TailwindCSS:** Framework CSS para estilização.
- **DaisyUI:** Componentes estilizados para TailwindCSS.

## Decisões de Design

- **SEO:** Migração de `react-helmet-async` para tags nativas do React 19, garantindo melhor performance e compatibilidade.
- **UI/UX:** Uso de TailwindCSS e DaisyUI para uma interface moderna e responsiva.
- **Gerenciamento de Estado:** Context API do React para estado global (carrinho, autenticação).

## Problemas Enfrentados

- **Conflito de Dependências:** Incompatibilidade do `react-helmet-async` com React 19, resolvida com migração para tags nativas.
- **Case Sensitivity no Git:** Problemas com nomes de pastas (`pages` vs `Pages`), resolvidos com renomeação forçada.
- **SEO:** Inicialmente, meta tags não eram injetadas corretamente, corrigido com ajustes na ordem de renderização.

## Dados e Funcionalidades

### Frontend (React):

- **Produtos:** ✅ Integração 100% com API backend real (MySQL) - **MockAPI removida**
- **Carrinho:** Persistência no banco de dados (para usuários autenticados) ou localStorage (para visitantes)
- **Autenticação:** Sistema JWT completo com login/registro
- **Busca e Filtros:** Filtros avançados por categoria, preço, desconto
- **SEO:** Meta tags dinâmicas para cada página
- **API Service:** Todas as requisições via `apiService.js`

### Backend (Node.js + MySQL):

- **API RESTful** completa com Express.js
- **Banco de Dados MySQL** com Sequelize ORM
- **Autenticação JWT** segura
- **CRUD de Produtos** com filtros avançados
- **Sistema de Carrinho** persistente
- **Checkout e Pedidos** com cálculo de impostos e frete
- **Integração Stripe** para pagamentos
- **Segurança:** bcrypt, rate limiting, helmet, validações

## Casos de Uso

- **Usuário não autenticado:** Pode navegar, buscar produtos e adicionar ao carrinho.
- **Usuário autenticado:** Pode finalizar compras, gerenciar perfil e ver histórico de pedidos.
- **Admin:** Gerenciamento de produtos e pedidos (funcionalidade futura).

## Regras de Negócio

- **Carrinho:** Máximo de 10 itens por produto.
- **Frete:** Grátis para compras acima de R\$ 200,00.
- **Desconto:** 10% para usuários autenticados.

## Instalação e Execução

### Frontend (React):

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Backend (Node.js + MySQL):

**Requisitos:**

- Node.js >= 18
- MySQL >= 8.0

```bash
# 1. Criar banco de dados MySQL
mysql -u root -p
CREATE DATABASE hypemode_ecommerce;
exit;

# 2. Instalar dependências do backend
cd backend
npm install

# 3. Configurar variáveis de ambiente (já configurado)
# Edite backend/.env se necessário (senha do MySQL, etc)

# 4. Popular banco de dados com dados iniciais
npm run db:seed

# 5. Iniciar servidor backend
npm run dev  # Roda na porta 3000

# 6. Em outro terminal, volte à raiz e inicie o frontend
cd ..
npm run dev  # Roda na porta 5173
```

**Credenciais de teste após seed:**

- Admin: `admin@hypemode.com` / `Admin123!`
- User: `john@example.com` / `User123!`

📖 **Guia detalhado:** `backend/SETUP.md`

## Estrutura de Pastas

```
hypemode-ecommerce-finalproject-fe/
├── backend/                    # 🆕 API Backend (Node.js + MySQL)
│   ├── src/
│   │   ├── config/            # Configuração do banco
│   │   ├── controllers/       # Lógica de negócio
│   │   ├── middleware/        # Autenticação e validação
│   │   ├── models/            # Modelos Sequelize
│   │   ├── routes/            # Rotas da API
│   │   ├── seeders/           # Dados iniciais
│   │   ├── utils/             # Utilitários
│   │   └── server.js          # Servidor principal
│   ├── .env                   # Configurações
│   ├── package.json
│   ├── README.md              # Documentação da API
│   └── SETUP.md              # Guia de instalação
│
├── src/                       # Frontend (React)
│   ├── components/
│   │   ├── features/         # Componentes de features
│   │   └── layout/           # Layout components
│   ├── pages/                # Páginas da aplicação
│   ├── hooks/                # Custom hooks
│   ├── contexts/             # Contextos do React
│   ├── utils/
│   │   └── api/
│   │       └── apiService.js  # ✅ Serviço da API (único arquivo)
│   └── data.js               # Dados estáticos
│
├── .env                       # 🆕 Config do frontend
├── package.json
├── README.md                  # Este arquivo
└── MIGRAÇÃO_PARA_API.md      # 🆕 Guia de migração completo
```

## 📚 Documentação Adicional

- **[✅ Migração Completa](./MIGRATION_COMPLETE.md)** - Status da migração (MockAPI removida)
- **[Guia Completo da API](./MIGRAÇÃO_PARA_API.md)** - Explicação completa da API
- **[Documentação da API Backend](./backend/README.md)** - Endpoints, autenticação, exemplos
- **[Setup do Backend](./backend/SETUP.md)** - Guia passo a passo de instalação
- **[Exemplos Práticos](./backend/EXEMPLOS_API.md)** - Como usar a API

## 🎯 Próximos Passos

1. **Testar a API Backend** - Siga o guia em `backend/SETUP.md`
2. **Explorar os Endpoints** - Veja a documentação em `backend/README.md`
3. **Adicionar Produtos** - Use as credenciais de admin para gerenciar produtos
4. **Implementar Pagamentos** - Configure o Stripe (opcional)
5. **Criar Interface Admin** - Desenvolva um painel de administração

## 🛠️ Tecnologias

### Frontend:

- React 19, Vite, TailwindCSS, DaisyUI
- React Router DOM, Axios
- React Hot Toast, Lucide React

### Backend:

- Node.js, Express.js
- MySQL, Sequelize ORM
- JWT, bcrypt
- Stripe, Helmet, CORS

## 🔐 Segurança

- Senhas hasheadas com bcrypt
- Tokens JWT para autenticação
- Rate limiting para prevenir ataques
- Validação de inputs
- Proteção contra SQL injection
- CORS configurado
