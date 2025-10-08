# 📮 Guia Completo Postman - HypeMode API

## 🚀 Configuração Inicial

### 1. Criar Collection

1. No Postman, clique em **New** → **Collection**
2. Nome: `HypeMode E-commerce API`
3. Salve

### 2. Configurar Environment

1. Clique no ícone de ambiente (olho) no canto superior direito
2. Clique em **Add**
3. Nome: `HypeMode Local`
4. Adicione as variáveis:

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `base_url` | `http://localhost:3000/api` | `http://localhost:3000/api` |
| `token` | (deixe vazio) | (deixe vazio) |

5. Salve e selecione este environment

---

## 🔐 1. Authentication Requests

### Login Admin (GET TOKEN)

**Criar request:**
- Name: `Login Admin`
- Method: `POST`
- URL: `{{base_url}}/auth/login`
- Headers:
  - `Content-Type`: `application/json`
- Body (raw JSON):
```json
{
  "email": "admin@hypemode.com",
  "password": "Admin123!"
}
```

**Auto-save token (Tests tab):**
```javascript
// Parse response
const response = pm.response.json();

// Save token to environment
if (response.success && response.data.token) {
    pm.environment.set("token", response.data.token);
    console.log("Token saved:", response.data.token);
}
```

**Salve e execute** - O token será salvo automaticamente!

---

## 🛍️ 2. Products Requests

### 2.1 Get All Products

- Name: `Get All Products`
- Method: `GET`
- URL: `{{base_url}}/products`
- Headers: (nenhum necessário)

**Tests (para salvar último produto):**
```javascript
const response = pm.response.json();

if (response.success && response.data && response.data.length > 0) {
    // Pega o último produto
    const lastProduct = response.data[response.data.length - 1];
    
    // Salva o ID
    pm.environment.set("last_product_id", lastProduct.id);
    
    console.log("Last product ID:", lastProduct.id);
    console.log("Last product name:", lastProduct.name);
}
```

---

### 2.2 Get Single Product

- Name: `Get Product by ID`
- Method: `GET`
- URL: `{{base_url}}/products/1`

---

### 2.3 Get Last Product (Automated)

- Name: `Get Last Product`
- Method: `GET`
- URL: `{{base_url}}/products/{{last_product_id}}`

**Pre-request Script:**
```javascript
// Se não tiver o ID salvo, busca todos os produtos primeiro
if (!pm.environment.get("last_product_id")) {
    pm.sendRequest({
        url: pm.environment.get("base_url") + "/products",
        method: "GET"
    }, function (err, response) {
        const data = response.json();
        if (data.success && data.data.length > 0) {
            const lastId = data.data[data.data.length - 1].id;
            pm.environment.set("last_product_id", lastId);
        }
    });
}
```

---

### 2.4 Create Product (Admin)

- Name: `Create Product`
- Method: `POST`
- URL: `{{base_url}}/products`
- Headers:
  - `Authorization`: `Bearer {{token}}`
  - `Content-Type`: `application/json`
- Body (raw JSON):
```json
{
  "name": "New Product Test",
  "description": "This is a test product created via Postman",
  "price": 99.99,
  "originalPrice": 129.99,
  "discount": true,
  "discountPercentage": 23,
  "category": "T-Shirts",
  "subcategory": "Graphic",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black", "White", "Navy"],
  "image": "/images/Home/Categories/TshirtCategory.png",
  "stock": 100,
  "rating": 4.5,
  "reviewsCount": 0,
  "featured": true,
  "newArrival": true,
  "bestSeller": false
}
```

---

### 2.5 Edit Product (Admin)

- Name: `Edit Product`
- Method: `PUT`
- URL: `{{base_url}}/products/1`
- Headers:
  - `Authorization`: `Bearer {{token}}`
  - `Content-Type`: `application/json`
- Body (raw JSON):
```json
{
  "name": "Updated Product Name",
  "price": 89.99,
  "discount": true,
  "discountPercentage": 30,
  "stock": 75
}
```

---

### 2.6 Edit Last Product (Automated) ⭐

- Name: `Edit Last Product`
- Method: `PUT`
- URL: `{{base_url}}/products/{{last_product_id}}`
- Headers:
  - `Authorization`: `Bearer {{token}}`
  - `Content-Type`: `application/json`

**Pre-request Script:**
```javascript
// Busca o último produto automaticamente
pm.sendRequest({
    url: pm.environment.get("base_url") + "/products",
    method: "GET"
}, function (err, response) {
    const data = response.json();
    if (data.success && data.data.length > 0) {
        const lastProduct = data.data[data.data.length - 1];
        pm.environment.set("last_product_id", lastProduct.id);
        console.log("Editing product ID:", lastProduct.id);
        console.log("Current name:", lastProduct.name);
    }
});
```

- Body (raw JSON):
```json
{
  "name": "Updated Last Product - {{$timestamp}}",
  "price": 149.99,
  "discount": true,
  "discountPercentage": 20,
  "stock": 50,
  "featured": true
}
```

---

### 2.7 Delete Product (Admin)

- Name: `Delete Product`
- Method: `DELETE`
- URL: `{{base_url}}/products/1`
- Headers:
  - `Authorization`: `Bearer {{token}}`

---

## 🛒 3. Cart Requests

### 3.1 Get Cart

- Name: `Get Cart`
- Method: `GET`
- URL: `{{base_url}}/cart`
- Headers:
  - `Authorization`: `Bearer {{token}}`

---

### 3.2 Add to Cart

- Name: `Add to Cart`
- Method: `POST`
- URL: `{{base_url}}/cart`
- Headers:
  - `Authorization`: `Bearer {{token}}`
  - `Content-Type`: `application/json`
- Body (raw JSON):
```json
{
  "productId": 1,
  "quantity": 2,
  "size": "M",
  "color": "Black"
}
```

---

### 3.3 Update Cart Item

- Name: `Update Cart Item`
- Method: `PUT`
- URL: `{{base_url}}/cart/1`
- Headers:
  - `Authorization`: `Bearer {{token}}`
  - `Content-Type`: `application/json`
- Body (raw JSON):
```json
{
  "quantity": 3
}
```

---

### 3.4 Remove from Cart

- Name: `Remove from Cart`
- Method: `DELETE`
- URL: `{{base_url}}/cart/1`
- Headers:
  - `Authorization`: `Bearer {{token}}`

---

### 3.5 Clear Cart

- Name: `Clear Cart`
- Method: `DELETE`
- URL: `{{base_url}}/cart`
- Headers:
  - `Authorization`: `Bearer {{token}}`

---

## 📦 4. Orders Requests

### 4.1 Create Order

- Name: `Create Order`
- Method: `POST`
- URL: `{{base_url}}/orders`
- Headers:
  - `Authorization`: `Bearer {{token}}`
  - `Content-Type`: `application/json`
- Body (raw JSON):
```json
{
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
    "name": "John Doe",
    "address": "123 Main Street",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA",
    "phone": "+1234567890"
  },
  "paymentMethod": "credit_card"
}
```

---

### 4.2 Get My Orders

- Name: `Get My Orders`
- Method: `GET`
- URL: `{{base_url}}/orders`
- Headers:
  - `Authorization`: `Bearer {{token}}`

---

### 4.3 Get Order by ID

- Name: `Get Order by ID`
- Method: `GET`
- URL: `{{base_url}}/orders/1`
- Headers:
  - `Authorization`: `Bearer {{token}}`

---

### 4.4 Get All Orders (Admin)

- Name: `Get All Orders (Admin)`
- Method: `GET`
- URL: `{{base_url}}/orders/admin/all`
- Headers:
  - `Authorization`: `Bearer {{token}}`

---

### 4.5 Update Order Status (Admin)

- Name: `Update Order Status`
- Method: `PUT`
- URL: `{{base_url}}/orders/1/status`
- Headers:
  - `Authorization`: `Bearer {{token}}`
  - `Content-Type`: `application/json`
- Body (raw JSON):
```json
{
  "status": "shipped",
  "trackingNumber": "PT123456789BR"
}
```

---

## 🎯 Workflow Recomendado

### Para Testar Produtos:

1. **Login Admin** → Salva o token automaticamente
2. **Get All Products** → Salva o ID do último produto
3. **Edit Last Product** → Edita automaticamente o último produto

### Para Testar Fluxo Completo:

1. **Login Admin**
2. **Create Product** → Criar produto
3. **Add to Cart** → Adicionar ao carrinho
4. **Get Cart** → Ver carrinho
5. **Create Order** → Criar pedido
6. **Get My Orders** → Ver pedidos

---

## 🔄 Scripts Úteis

### Pre-request Script Global (na Collection)

```javascript
// Auto-refresh token se expirado (opcional)
const token = pm.environment.get("token");
if (!token) {
    console.log("⚠️ Token not found. Please login first.");
}
```

### Tests Global (na Collection)

```javascript
// Verificar se resposta é sucesso
if (pm.response.code === 200 || pm.response.code === 201) {
    console.log("✅ Request successful");
} else {
    console.log("❌ Request failed:", pm.response.code);
}
```

---

## 📋 Campos do Produto

Todos os campos disponíveis para criar/editar produtos:

```javascript
{
  // Obrigatórios
  "name": string,           // Nome do produto
  "price": number,          // Preço
  "category": string,       // Categoria
  "stock": number,          // Estoque
  
  // Opcionais
  "description": string,
  "originalPrice": number,
  "discount": boolean,
  "discountPercentage": number (0-100),
  "subcategory": string,
  "sizes": array,           // ["S", "M", "L"]
  "colors": array,          // ["Black", "White"]
  "image": string,
  "images": array,
  "rating": number (0-5),
  "reviewsCount": number,
  "featured": boolean,
  "newArrival": boolean,
  "bestSeller": boolean,
  "active": boolean
}
```

---

## 🚨 Troubleshooting

### "Unauthorized" Error
- Faça login novamente: Execute **Login Admin**
- Verifique se o token está salvo: `{{token}}`

### "Not authorized" Error
- Você precisa ser admin
- Credenciais: `admin@hypemode.com` / `Admin123!`

### Connection Refused
- Backend não está rodando
- Execute: `cd backend && npm run dev`

---

## 💡 Dicas

1. **Organize suas requests** em folders: Auth, Products, Cart, Orders
2. **Use environment variables** para facilitar mudanças
3. **Salve tokens automaticamente** com Tests scripts
4. **Use Pre-request Scripts** para automatizar workflows
5. **Documente** suas requests com descrições

---

**Pronto! Agora você tem uma Collection Postman completa!** 🎉

