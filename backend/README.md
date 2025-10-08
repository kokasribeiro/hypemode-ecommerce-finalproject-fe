# Hypemode E-commerce Backend API

Backend API para a aplicação de e-commerce Hypemode, construído com Node.js, Express e MySQL.

## 🚀 Funcionalidades

- ✅ **Autenticação JWT** - Login/Registro com tokens seguros
- ✅ **Gestão de Produtos** - CRUD completo de produtos
- ✅ **Carrinho de Compras** - Sistema persistente de carrinho
- ✅ **Sistema de Pedidos** - Checkout e gestão de pedidos
- ✅ **Pagamentos Stripe** - Integração com Stripe (opcional)
- ✅ **Controle de Acesso** - Sistema de roles (user/admin)
- ✅ **Segurança** - Rate limiting, helmet, validações

## 📋 Requisitos

- Node.js >= 18
- MySQL >= 8.0
- npm ou yarn

## ⚙️ Instalação

1. **Clone e navegue para a pasta backend:**

   ```bash
   cd backend
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure o banco de dados MySQL:**

   ```sql
   CREATE DATABASE hypemode_ecommerce;
   ```

4. **Configure as variáveis de ambiente:**

   ```bash
   cp .env.example .env
   ```

   Edite o arquivo `.env` com suas configurações:

   ```env
   PORT=3000
   NODE_ENV=development

   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=hypemode_ecommerce
   DB_USER=root
   DB_PASSWORD=sua_senha

   JWT_SECRET=seu_secret_jwt_super_seguro
   JWT_EXPIRE=7d

   FRONTEND_URL=http://localhost:5173
   ```

5. **Popule o banco de dados com dados iniciais:**

   ```bash
   npm run db:seed
   ```

6. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

O servidor estará rodando em `http://localhost:3000`

## 📚 Endpoints da API

### Autenticação

| Método | Endpoint             | Descrição                     | Auth |
| ------ | -------------------- | ----------------------------- | ---- |
| POST   | `/api/auth/register` | Registrar novo usuário        | Não  |
| POST   | `/api/auth/login`    | Login de usuário              | Não  |
| GET    | `/api/auth/me`       | Obter dados do usuário logado | Sim  |
| PUT    | `/api/auth/profile`  | Atualizar perfil              | Sim  |

### Produtos

| Método | Endpoint            | Descrição                     | Auth  |
| ------ | ------------------- | ----------------------------- | ----- |
| GET    | `/api/products`     | Listar produtos (com filtros) | Não   |
| GET    | `/api/products/:id` | Obter produto específico      | Não   |
| POST   | `/api/products`     | Criar produto                 | Admin |
| PUT    | `/api/products/:id` | Atualizar produto             | Admin |
| DELETE | `/api/products/:id` | Deletar produto               | Admin |

**Filtros disponíveis:**

- `category` - Filtrar por categoria
- `search` - Buscar por nome/descrição
- `minPrice` / `maxPrice` - Filtro de preço
- `discount=true` - Apenas produtos com desconto
- `featured=true` - Produtos em destaque
- `newArrival=true` - Novos produtos
- `bestSeller=true` - Mais vendidos
- `page` / `limit` - Paginação
- `sort` - Ordenação (ex: `-createdAt`, `price`)

### Carrinho

| Método | Endpoint        | Descrição                    | Auth |
| ------ | --------------- | ---------------------------- | ---- |
| GET    | `/api/cart`     | Obter carrinho do usuário    | Sim  |
| POST   | `/api/cart`     | Adicionar item ao carrinho   | Sim  |
| PUT    | `/api/cart/:id` | Atualizar quantidade do item | Sim  |
| DELETE | `/api/cart/:id` | Remover item do carrinho     | Sim  |
| DELETE | `/api/cart`     | Limpar carrinho              | Sim  |

### Pedidos

| Método | Endpoint                  | Descrição                     | Auth  |
| ------ | ------------------------- | ----------------------------- | ----- |
| POST   | `/api/orders`             | Criar novo pedido             | Sim   |
| GET    | `/api/orders`             | Listar pedidos do usuário     | Sim   |
| GET    | `/api/orders/:id`         | Obter pedido específico       | Sim   |
| GET    | `/api/orders/admin/all`   | Listar todos os pedidos       | Admin |
| PUT    | `/api/orders/:id/status`  | Atualizar status do pedido    | Admin |
| POST   | `/api/orders/:id/payment` | Criar payment intent (Stripe) | Sim   |

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Após o login/registro, você receberá um token que deve ser incluído no header das requisições autenticadas:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

## 👤 Credenciais Padrão (após seed)

**Admin:**

- Email: `admin@hypemode.com`
- Password: `Admin123!`

**Usuário:**

- Email: `john@example.com`
- Password: `User123!`

## 📦 Estrutura do Produto

```json
{
  "name": "Nome do Produto",
  "description": "Descrição detalhada",
  "price": 99.99,
  "originalPrice": 129.99,
  "discount": true,
  "discountPercentage": 23,
  "category": "Jackets",
  "subcategory": "Bomber",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black", "Navy"],
  "image": "/path/to/image.png",
  "images": [],
  "stock": 50,
  "rating": 4.5,
  "reviewsCount": 23,
  "featured": true,
  "newArrival": true,
  "bestSeller": false,
  "active": true
}
```

## 🛠️ Scripts Disponíveis

```bash
npm start          # Iniciar servidor em produção
npm run dev        # Iniciar servidor em desenvolvimento (com nodemon)
npm run db:seed    # Popular banco de dados com dados iniciais
```

## 🔧 Tecnologias Utilizadas

- **Express.js** - Framework web
- **Sequelize** - ORM para MySQL
- **MySQL2** - Driver MySQL
- **bcryptjs** - Hash de senhas
- **jsonwebtoken** - Autenticação JWT
- **Stripe** - Processamento de pagamentos
- **Helmet** - Segurança HTTP
- **CORS** - Cross-Origin Resource Sharing
- **express-rate-limit** - Rate limiting
- **express-validator** - Validação de dados
- **Morgan** - Logger HTTP

## 🔒 Segurança

- Senhas hasheadas com bcrypt
- JWT para autenticação stateless
- Rate limiting para prevenir ataques
- Helmet para headers HTTP seguros
- Validação de inputs
- Proteção contra SQL injection (via ORM)
- CORS configurado

## 📝 Notas Importantes

- O Stripe é **opcional**. Se não configurado, a funcionalidade de pagamento não estará disponível
- Por padrão, o banco é sincronizado sem apagar dados (`force: false`)
- O seeder (`npm run db:seed`) **APAGA TODOS OS DADOS** e recria as tabelas
- Em produção, configure `NODE_ENV=production` e use HTTPS
- Altere o `JWT_SECRET` para um valor seguro em produção

## 🚨 Troubleshooting

**Erro de conexão com MySQL:**

- Verifique se o MySQL está rodando
- Confirme as credenciais no `.env`
- Certifique-se que o banco de dados foi criado

**Erro "Table doesn't exist":**

- Execute `npm run db:seed` para criar as tabelas

**Erro de autenticação:**

- Verifique se o token está sendo enviado corretamente
- Confirme que o `JWT_SECRET` está configurado

## 📞 Suporte

Para questões ou problemas, entre em contato ou abra uma issue no repositório.

