# 🎓 HypeMode E-Commerce - Guia de Avaliação

## 👨‍🏫 Bem-vindo, Professor!

Este é um projeto completo de **E-Commerce** desenvolvido com **React + Vite** (frontend) e **Node.js + Express + MySQL** (backend).

---

## 🌐 Links do Projeto

### **Frontend (Vercel)**
- **URL de Produção:** https://hypemode-ecommerce-finalproject-fe.vercel.app
- **Status:** ✅ Deployed e funcionando

### **Backend (Render)**
- **URL da API:** https://hypemode-backend.onrender.com/api
- **Status:** ⚠️ Pode estar em "sleep mode" (free tier) - a primeira requisição pode demorar ~30 segundos

### **Localhost (Desenvolvimento)**
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000/api

---

## 🔐 Credenciais de Teste

### **Usuário Admin**
- **Email:** `admin@hypemode.com`
- **Password:** `Admin123!`
- **Permissões:** Acesso total (criar/editar/deletar produtos)

### **Usuário Regular 1**
- **Email:** `toni@gmail.com`
- **Password:** `Ton12345.`
- **Permissões:** Usuário normal (comprar, ver perfil, carrinho)

### **Usuário Regular 2**
- **Email:** `test@test.com`
- **Password:** `Test123!`
- **Permissões:** Usuário normal

### **Criar Nova Conta**
Você também pode criar sua própria conta em:
- **Localhost:** http://localhost:5173/register
- **Vercel:** https://hypemode-ecommerce-finalproject-fe.vercel.app/register

**Requisitos de senha:**
- Mínimo 8 caracteres
- Pelo menos 1 letra maiúscula
- Pelo menos 1 caractere especial (ex: `!`, `@`, `#`, `$`, `.`)

---

## ✅ Funcionalidades Implementadas

### **🛍️ E-Commerce Completo**
- ✅ Catálogo de produtos (30 produtos reais com imagens do Unsplash)
- ✅ Filtros por categoria, preço, sale items
- ✅ Busca de produtos
- ✅ Carrinho de compras (persistente)
- ✅ Checkout completo
- ✅ Sistema de autenticação (JWT)
- ✅ Perfil de usuário
- ✅ Mudança de senha
- ✅ Responsivo (mobile-first)

### **🔒 Segurança**
- ✅ Senhas hasheadas com bcrypt
- ✅ Tokens JWT para autenticação
- ✅ Rate limiting (proteção contra ataques)
- ✅ Validação de inputs (Zod)
- ✅ CORS configurado
- ✅ Proteção contra SQL injection

### **🏗️ Arquitetura**
- ✅ Clean Architecture
- ✅ Use Case Pattern
- ✅ Repository Pattern
- ✅ Dependency Injection
- ✅ Custom Domain Errors
- ✅ HATEOAS (REST API)

---

## 🚀 Como Testar Localmente

### **Pré-requisitos**
- Node.js v18+
- MySQL 8.0+
- npm ou yarn

### **1. Clonar o Repositório**
```bash
git clone https://github.com/SEU_USUARIO/hypemode-ecommerce-finalproject-fe.git
cd hypemode-ecommerce-finalproject-fe
```

### **2. Configurar o Backend**

```bash
cd backend
npm install
```

**Criar arquivo `.env` no diretório `backend/`:**
```env
NODE_ENV=development
PORT=3000

# Database (MySQL Local)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=hypemode_ecommerce
DB_USER=root
DB_PASSWORD=

# JWT
JWT_SECRET=dev-secret-key

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**Criar o banco de dados MySQL:**
```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS hypemode_ecommerce;"
```

**Iniciar o backend:**
```bash
npm run dev
```

O backend estará rodando em: `http://localhost:3000`

### **3. Configurar o Frontend**

```bash
cd ..  # voltar para a raiz do projeto
npm install
```

**Criar arquivo `.env` na raiz do projeto:**
```env
VITE_API_URL=http://localhost:3000/api
```

**Iniciar o frontend:**
```bash
npm run dev
```

O frontend estará rodando em: `http://localhost:5173`

---

## 🧪 Fluxo de Teste Recomendado

### **1. Criar uma Conta**
1. Acesse: http://localhost:5173/register
2. Preencha os dados (use uma senha válida: ex: `Test1234!`)
3. Clique em "Create Account"
4. Você será redirecionado para a home page logado

### **2. Explorar Produtos**
1. Vá para: http://localhost:5173/products
2. Teste os filtros:
   - Filtro por categoria (Shoes, T-Shirts, Sweaters, Jackets, Accessories)
   - Filtro por preço (min/max)
   - "Show sale items only"
3. Teste a busca (ex: "Nike", "Sweater", "Black")

### **3. Adicionar ao Carrinho**
1. Clique em qualquer produto
2. Selecione tamanho e cor
3. Clique em "Add to Cart"
4. Veja o carrinho no ícone superior direito

### **4. Fazer Checkout**
1. Clique no ícone do carrinho
2. Clique em "Proceed to Checkout"
3. Preencha os dados de envio
4. Clique em "Place Order"

### **5. Ver Perfil**
1. Clique no ícone de usuário (canto superior direito)
2. Veja seus dados
3. Clique em "Edit Profile" para editar
4. Clique em "Change Password" para mudar a senha

### **6. Testar Admin (Opcional)**
1. Faça logout
2. Faça login com: `admin@hypemode.com` / `Admin123!`
3. Acesse funcionalidades de admin (se implementadas)

---

## 📊 Estrutura do Projeto

```
hypemode-ecommerce-finalproject-fe/
├── backend/                    # Backend (Node.js + Express)
│   ├── src/
│   │   ├── http/              # Controllers e Routes
│   │   ├── use-cases/         # Business Logic
│   │   ├── lib/               # Database e Sequelize
│   │   ├── schemas/           # Validações (Zod)
│   │   └── utils/             # Helpers
│   ├── package.json
│   └── .env
├── src/                       # Frontend (React + Vite)
│   ├── components/            # Componentes reutilizáveis
│   ├── pages/                 # Páginas
│   ├── contexts/              # Context API (Cart, Auth)
│   ├── hooks/                 # Custom Hooks
│   ├── utils/                 # API Service, Helpers
│   └── assets/                # Imagens, estilos
├── public/                    # Assets públicos
├── package.json
├── .env
└── README.md
```

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- React Hot Toast

### **Backend**
- Node.js
- Express
- Sequelize (ORM)
- MySQL / PostgreSQL
- JWT (jsonwebtoken)
- Bcrypt
- Zod (validação)
- Express Rate Limit

---

## 📝 Notas Importantes

### **⚠️ Render Free Tier**
O backend no Render (free tier) entra em "sleep mode" após 15 minutos de inatividade. A primeira requisição pode demorar ~30 segundos para "acordar" o serviço.

### **⚠️ Banco de Dados**
- **Localhost:** Usa MySQL
- **Render (Produção):** Usa PostgreSQL (free tier do Render não oferece MySQL)

### **⚠️ Produtos**
O banco de dados local tem **30 produtos** com imagens reais do Unsplash. O banco do Render pode estar vazio e precisa ser populado.

---

## 🐛 Troubleshooting

### **Problema: "Network Error" no frontend**
**Solução:** Verifique se o backend está rodando em `http://localhost:3000`

### **Problema: "CORS Error"**
**Solução:** O backend já está configurado para aceitar requisições do frontend

### **Problema: "Cannot connect to database"**
**Solução:** Verifique se o MySQL está rodando e se o banco `hypemode_ecommerce` foi criado

### **Problema: "No products showing"**
**Solução:** O banco de dados pode estar vazio. Execute o seeder:
```bash
cd backend
npm run seed
```
⚠️ **ATENÇÃO:** Isso vai deletar todos os dados e recriar do zero!

---

## 📧 Contato

Se tiver alguma dúvida ou problema, entre em contato com o aluno.

---

## 🎯 Critérios de Avaliação Sugeridos

- ✅ **Funcionalidade:** Todas as features funcionam corretamente?
- ✅ **Código:** Está bem organizado, limpo e comentado?
- ✅ **Segurança:** Senhas hasheadas, JWT, validações?
- ✅ **Arquitetura:** Separação de responsabilidades, padrões de design?
- ✅ **UI/UX:** Interface intuitiva e responsiva?
- ✅ **Deployment:** Projeto deployado e acessível online?
- ✅ **Documentação:** README claro e completo?

---

**Obrigado por avaliar este projeto! 🚀**

