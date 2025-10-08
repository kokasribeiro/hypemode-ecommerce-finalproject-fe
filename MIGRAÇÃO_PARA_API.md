# 📦 Migração de MockAPI para API Real

## O que foi criado?

Foi criada uma **API backend completa e profissional** com Node.js, Express e MySQL para substituir a MockAPI.

## 🎯 Estrutura do Projeto

```
hypemode-ecommerce-finalproject-fe/
├── backend/                    # ✨ NOVO - API Backend
│   ├── src/
│   │   ├── config/            # Configuração do banco de dados
│   │   ├── controllers/       # Lógica de negócio
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   └── orderController.js
│   │   ├── middleware/        # Autenticação e validação
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/            # Modelos de dados (Sequelize)
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Cart.js
│   │   │   ├── Order.js
│   │   │   └── index.js
│   │   ├── routes/            # Rotas da API
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── seeders/           # Dados iniciais
│   │   │   └── seed.js
│   │   ├── utils/             # Utilitários
│   │   │   └── generateToken.js
│   │   └── server.js          # Servidor principal
│   ├── .env                   # Configurações (criado)
│   ├── .env.example
│   ├── package.json
│   ├── README.md              # Documentação da API
│   └── SETUP.md              # Guia de instalação
│
├── src/
│   ├── utils/
│   │   └── api/
│   │       ├── apiService.js  # ✨ NOVO - Serviço completo da API
│   │       └── mockapi.jsx    # ✅ ATUALIZADO - Agora usa apiService
│   └── ...
├── .env                       # ✨ NOVO - Config do frontend
└── .env.example

```

## ✨ Funcionalidades Implementadas

### 1. **Autenticação JWT Completa**

- ✅ Registro de usuários
- ✅ Login com tokens seguros
- ✅ Roles (user/admin)
- ✅ Proteção de rotas
- ✅ Atualização de perfil

### 2. **Sistema de Produtos Avançado**

- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Filtros avançados (categoria, preço, desconto)
- ✅ Busca por nome/descrição
- ✅ Produtos em destaque, novos, best sellers
- ✅ Paginação
- ✅ Controle de estoque
- ✅ Múltiplos tamanhos e cores
- ✅ Sistema de desconto

### 3. **Carrinho Persistente**

- ✅ Carrinho salvo no banco de dados
- ✅ Sincronização entre dispositivos
- ✅ Controle de quantidade
- ✅ Validação de estoque

### 4. **Sistema de Pedidos**

- ✅ Criação de pedidos
- ✅ Histórico de pedidos
- ✅ Status (pending, processing, shipped, delivered)
- ✅ Cálculo de impostos e frete
- ✅ Tracking number

### 5. **Integração de Pagamentos**

- ✅ Stripe Payment Intents
- ✅ Processamento seguro
- ✅ Webhooks (estrutura pronta)

### 6. **Segurança**

- ✅ Senhas hasheadas (bcrypt)
- ✅ JWT para autenticação
- ✅ Rate limiting
- ✅ Helmet (segurança HTTP)
- ✅ CORS configurado
- ✅ Validação de inputs
- ✅ Proteção SQL injection (ORM)

## 📊 Banco de Dados

### Tabelas Criadas:

1. **users** - Usuários e admins
2. **products** - Catálogo de produtos
3. **carts** - Itens no carrinho
4. **orders** - Pedidos realizados

### Campos do Produto (Como você pediu):

```javascript
{
  name: "Nome do produto",
  price: 99.99,
  discount: true,           // ✅ Verdadeiro ou falso
  discountPercentage: 20,
  sizes: ["S", "M", "L"],   // ✅ Array de tamanhos
  colors: ["Black", "White"],
  stock: 50,
  category: "Jackets",
  // ... e muito mais
}
```

## 🔄 Compatibilidade com Frontend Existente

**Você NÃO precisa mudar nada no frontend imediatamente!**

O arquivo `mockapi.jsx` foi atualizado para usar a nova API automaticamente, mantendo a mesma interface. Todo o código existente continuará funcionando.

### Antes (MockAPI):

```javascript
import { fetchProducts } from '../utils/api/mockapi';
const products = await fetchProducts();
```

### Agora (API Real - funciona igual):

```javascript
import { fetchProducts } from '../utils/api/mockapi';
const products = await fetchProducts(); // Mesmo código!
```

### Para Novas Funcionalidades:

```javascript
import { productAPI, authAPI, cartAPI, orderAPI } from '../utils/api/apiService';

// Login
await authAPI.login('email@example.com', 'password');

// Produtos com filtros
await productAPI.getAll({ category: 'Jackets', discount: true });

// Carrinho
await cartAPI.add(productId, quantity, size, color);

// Pedidos
await orderAPI.create(orderData);
```

## 🚀 Como Iniciar

### Leia o guia completo:

```bash
cd backend
cat SETUP.md
```

### Resumo rápido:

1. **Instalar MySQL** (se não tiver)
2. **Criar banco de dados:**
   ```sql
   CREATE DATABASE hypemode_ecommerce;
   ```
3. **Instalar dependências do backend:**
   ```bash
   cd backend
   npm install
   ```
4. **Popular banco de dados:**
   ```bash
   npm run db:seed
   ```
5. **Iniciar backend:**
   ```bash
   npm run dev
   ```
6. **Iniciar frontend (em outro terminal):**
   ```bash
   cd ..
   npm run dev
   ```

## 🎓 Credenciais de Teste

**Admin:**

- Email: `admin@hypemode.com`
- Senha: `Admin123!`

**User:**

- Email: `john@example.com`
- Senha: `User123!`

## 📝 Dados Iniciais

Após executar `npm run db:seed`, você terá:

- ✅ 2 usuários (1 admin + 1 user)
- ✅ 15 produtos de exemplo
- ✅ Produtos em todas as categorias (Jackets, Sweaters, T-Shirts, Accessories, Shoes)
- ✅ Produtos com e sem desconto
- ✅ Tamanhos e cores configurados

## 🔧 Próximos Passos

### Para Administração de Produtos:

Você pode criar produtos via API ou criar uma interface admin. Exemplo com curl:

```bash
# Login como admin
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hypemode.com","password":"Admin123!"}' \
  | jq -r '.data.token')

# Criar produto
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Meu Novo Produto",
    "price": 79.99,
    "discount": true,
    "discountPercentage": 15,
    "sizes": ["S", "M", "L", "XL"],
    "category": "Jackets",
    "stock": 30
  }'
```

### Ou use Postman/Insomnia:

1. Importe as rotas da documentação (backend/README.md)
2. Faça login para obter o token
3. Use o token no header: `Authorization: Bearer SEU_TOKEN`

## 📚 Documentação Completa

- **API Backend:** `backend/README.md`
- **Setup Rápido:** `backend/SETUP.md`

## 🎉 O que mudou?

| Antes (MockAPI)                | Agora (API Real)                     |
| ------------------------------ | ------------------------------------ |
| ❌ Dados fixos                 | ✅ Dados dinâmicos no MySQL          |
| ❌ Sem autenticação            | ✅ Login/registro completo           |
| ❌ Carrinho só no localStorage | ✅ Carrinho persistente no banco     |
| ❌ Sem checkout real           | ✅ Sistema de pedidos completo       |
| ❌ Sem controle de estoque     | ✅ Controle de estoque em tempo real |
| ❌ Sem admin                   | ✅ Sistema de roles (admin/user)     |
| ❌ Sem pagamentos              | ✅ Integração Stripe                 |
| ❌ Apenas GET                  | ✅ CRUD completo                     |

## ❓ FAQ

**Q: Preciso mudar todo o código do frontend?**
A: Não! O código existente continuará funcionando. Apenas novas funcionalidades precisarão usar o novo apiService.

**Q: Posso ainda usar a MockAPI?**
A: Não recomendado. A nova API é muito superior e você já tem tudo configurado.

**Q: Como adiciono novos produtos?**
A: Use as credenciais de admin e faça requisições POST para `/api/products` ou crie uma interface admin.

**Q: E se eu não quiser usar MySQL?**
A: Você pode adaptar o código para usar PostgreSQL, MongoDB, etc. Mas MySQL é recomendado para e-commerce.

**Q: O Stripe é obrigatório?**
A: Não. Se não configurar, apenas a funcionalidade de pagamento não estará disponível.

---

**Pronto para produção!** 🚀

Esta é uma API profissional, escalável e segura, pronta para uso em ambiente de produção (com as devidas configurações de produção).

