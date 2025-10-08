# 📚 Exemplos Práticos de Uso da API

Este documento contém exemplos práticos de como usar a API do HypeMode E-Commerce.

## 🔐 Autenticação

### 1. Registrar Novo Usuário

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Silva",
    "email": "maria@example.com",
    "password": "MinhaSenh@123",
    "phone": "+351912345678",
    "address": "Rua das Flores, 123",
    "city": "Lisboa",
    "postalCode": "1000-100",
    "country": "Portugal"
  }'
```

**Resposta:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 3,
      "name": "Maria Silva",
      "email": "maria@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hypemode.com",
    "password": "Admin123!"
  }'
```

### 3. Obter Dados do Usuário Logado

```bash
# Salve o token recebido no login
TOKEN="seu_token_aqui"

curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Atualizar Perfil

```bash
curl -X PUT http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Silva Santos",
    "phone": "+351913333333"
  }'
```

---

## 🛍️ Produtos

### 1. Listar Todos os Produtos

```bash
curl http://localhost:3000/api/products
```

### 2. Listar Produtos com Filtros

**Por categoria:**

```bash
curl "http://localhost:3000/api/products?category=Jackets"
```

**Produtos em desconto:**

```bash
curl "http://localhost:3000/api/products?discount=true"
```

**Filtro de preço:**

```bash
curl "http://localhost:3000/api/products?minPrice=50&maxPrice=150"
```

**Busca por nome:**

```bash
curl "http://localhost:3000/api/products?search=jacket"
```

**Produtos em destaque:**

```bash
curl "http://localhost:3000/api/products?featured=true"
```

**Novos produtos:**

```bash
curl "http://localhost:3000/api/products?newArrival=true"
```

**Best sellers:**

```bash
curl "http://localhost:3000/api/products?bestSeller=true"
```

**Paginação:**

```bash
curl "http://localhost:3000/api/products?page=1&limit=10"
```

**Ordenação:**

```bash
# Mais recentes primeiro
curl "http://localhost:3000/api/products?sort=-createdAt"

# Preço crescente
curl "http://localhost:3000/api/products?sort=price"

# Preço decrescente
curl "http://localhost:3000/api/products?sort=-price"
```

**Múltiplos filtros:**

```bash
curl "http://localhost:3000/api/products?category=Jackets&discount=true&minPrice=50&maxPrice=200&sort=-price"
```

### 3. Obter Produto Específico

```bash
curl http://localhost:3000/api/products/1
```

### 4. Criar Produto (Admin)

```bash
# Login como admin primeiro
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hypemode.com","password":"Admin123!"}' \
  | jq -r '.data.token')

# Criar produto
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jaqueta Bomber Premium",
    "description": "Jaqueta bomber de alta qualidade com design moderno",
    "price": 149.99,
    "originalPrice": 199.99,
    "discount": true,
    "discountPercentage": 25,
    "category": "Jackets",
    "subcategory": "Bomber",
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["Preto", "Azul Marinho", "Verde"],
    "image": "/images/jacket-premium.jpg",
    "stock": 50,
    "featured": true,
    "newArrival": true
  }'
```

### 5. Atualizar Produto (Admin)

```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 139.99,
    "stock": 45
  }'
```

### 6. Deletar Produto (Admin)

```bash
curl -X DELETE http://localhost:3000/api/products/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🛒 Carrinho

### 1. Ver Carrinho

```bash
curl -X GET http://localhost:3000/api/cart \
  -H "Authorization: Bearer $TOKEN"
```

### 2. Adicionar Item ao Carrinho

```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": 2,
    "size": "M",
    "color": "Black"
  }'
```

### 3. Atualizar Quantidade

```bash
# cartItemId é o ID do item no carrinho (não o productId)
curl -X PUT http://localhost:3000/api/cart/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 3
  }'
```

### 4. Remover Item do Carrinho

```bash
curl -X DELETE http://localhost:3000/api/cart/1 \
  -H "Authorization: Bearer $TOKEN"
```

### 5. Limpar Carrinho

```bash
curl -X DELETE http://localhost:3000/api/cart \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📦 Pedidos

### 1. Criar Pedido (Checkout)

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productId": 1,
        "quantity": 2,
        "size": "M",
        "color": "Black"
      },
      {
        "productId": 5,
        "quantity": 1,
        "size": "L"
      }
    ],
    "shippingAddress": {
      "name": "Maria Silva",
      "address": "Rua das Flores, 123",
      "city": "Lisboa",
      "postalCode": "1000-100",
      "country": "Portugal",
      "phone": "+351912345678"
    },
    "paymentMethod": "credit_card"
  }'
```

**Resposta:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "orderNumber": "ORD-1696789234567-1234",
    "subtotal": "279.98",
    "tax": "27.99",
    "shipping": "0.00",
    "total": "307.97",
    "status": "pending",
    "paymentStatus": "pending"
  }
}
```

### 2. Listar Meus Pedidos

```bash
curl -X GET http://localhost:3000/api/orders \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Ver Detalhes de um Pedido

```bash
curl -X GET http://localhost:3000/api/orders/1 \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Listar Todos os Pedidos (Admin)

```bash
curl -X GET http://localhost:3000/api/orders/admin/all \
  -H "Authorization: Bearer $TOKEN"
```

### 5. Atualizar Status do Pedido (Admin)

```bash
curl -X PUT http://localhost:3000/api/orders/1/status \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "shipped",
    "trackingNumber": "PT123456789BR"
  }'
```

Valores possíveis para `status`:

- `pending` - Pendente
- `processing` - Processando
- `shipped` - Enviado
- `delivered` - Entregue
- `cancelled` - Cancelado

### 6. Criar Payment Intent (Stripe)

```bash
curl -X POST http://localhost:3000/api/orders/1/payment \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🔍 Exemplos de Uso no Frontend (JavaScript)

### Setup Inicial

```javascript
import { authAPI, productAPI, cartAPI, orderAPI } from './utils/api/apiService';
```

### Autenticação

```javascript
// Login
try {
  const response = await authAPI.login('admin@hypemode.com', 'Admin123!');
  console.log('Usuário logado:', response.data.user);
  console.log('Token salvo automaticamente no localStorage');
} catch (error) {
  console.error('Erro no login:', error);
}

// Registro
try {
  const response = await authAPI.register({
    name: 'Maria Silva',
    email: 'maria@example.com',
    password: 'MinhaSenh@123',
    phone: '+351912345678',
    address: 'Rua das Flores, 123',
    city: 'Lisboa',
    postalCode: '1000-100',
    country: 'Portugal',
  });
  console.log('Usuário registrado:', response.data.user);
} catch (error) {
  console.error('Erro no registro:', error);
}

// Verificar se está autenticado
const isLoggedIn = authAPI.isAuthenticated();

// Verificar se é admin
const isAdmin = authAPI.isAdmin();

// Obter usuário atual
const currentUser = authAPI.getCurrentUser();

// Logout
authAPI.logout();
```

### Produtos

```javascript
// Listar todos
const products = await productAPI.getAll();

// Com filtros
const jackets = await productAPI.getAll({
  category: 'Jackets',
  discount: true,
  minPrice: 50,
  maxPrice: 200,
  sort: '-price',
});

// Buscar
const results = await productAPI.search('bomber');

// Por categoria
const sweaters = await productAPI.getByCategory('Sweaters');

// Em destaque
const featured = await productAPI.getFeatured();

// Novos produtos
const newArrivals = await productAPI.getNewArrivals();

// Best sellers
const bestSellers = await productAPI.getBestSellers();

// Em promoção
const onSale = await productAPI.getOnSale();

// Produto específico
const product = await productAPI.getById(1);

// Criar (Admin)
const newProduct = await productAPI.create({
  name: 'Novo Produto',
  price: 99.99,
  discount: true,
  discountPercentage: 20,
  sizes: ['S', 'M', 'L'],
  category: 'T-Shirts',
  stock: 100,
});

// Atualizar (Admin)
await productAPI.update(1, { price: 89.99, stock: 95 });

// Deletar (Admin)
await productAPI.delete(1);
```

### Carrinho

```javascript
// Ver carrinho
const cart = await cartAPI.get();

// Adicionar item
await cartAPI.add(productId, 2, 'M', 'Black');

// Atualizar quantidade
await cartAPI.update(cartItemId, 3);

// Remover item
await cartAPI.remove(cartItemId);

// Limpar carrinho
await cartAPI.clear();
```

### Pedidos

```javascript
// Criar pedido
const order = await orderAPI.create({
  items: [
    { productId: 1, quantity: 2, size: 'M', color: 'Black' },
    { productId: 5, quantity: 1, size: 'L' },
  ],
  shippingAddress: {
    name: 'Maria Silva',
    address: 'Rua das Flores, 123',
    city: 'Lisboa',
    postalCode: '1000-100',
    country: 'Portugal',
    phone: '+351912345678',
  },
  paymentMethod: 'credit_card',
});

// Listar meus pedidos
const myOrders = await orderAPI.getAll();

// Ver pedido específico
const orderDetails = await orderAPI.getById(1);

// Todos os pedidos (Admin)
const allOrders = await orderAPI.getAllAdmin();

// Atualizar status (Admin)
await orderAPI.updateStatus(1, 'shipped', 'PT123456789BR');

// Criar payment intent
const paymentIntent = await orderAPI.createPaymentIntent(1);
```

---

## 🧪 Testando com Postman/Insomnia

### Importar Collection

Crie uma collection com estas configurações:

**Base URL:** `http://localhost:3000/api`

**Headers Globais:**

```
Content-Type: application/json
Authorization: Bearer {{token}}
```

**Variável de ambiente:**

- `token`: O token JWT obtido no login

---

## 💡 Dicas

1. **Sempre salve o token após login** para usar nas próximas requisições
2. **Use jq** para formatar JSON no terminal: `curl ... | jq`
3. **Para desenvolvimento**, use ferramentas como Postman ou Insomnia
4. **Em produção**, sempre use HTTPS
5. **Rate limit**: Máximo de 100 requisições por 15 minutos por IP

---

## 📖 Documentação Completa

- **README da API:** `backend/README.md`
- **Guia de Setup:** `backend/SETUP.md`
- **Guia de Migração:** `../MIGRAÇÃO_PARA_API.md`

