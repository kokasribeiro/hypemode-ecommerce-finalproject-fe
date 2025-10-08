# 🛍️ Como Gerenciar Produtos

## 📍 Onde Estão os Produtos?

Os produtos estão salvos no **banco de dados MySQL** na tabela `products` do banco `hypemode_ecommerce`.

---

## 🔧 3 Formas de Adicionar/Editar Produtos

### ✅ **Opção 1: Postman/Insomnia (Recomendado)**

#### 1️⃣ Baixe uma ferramenta:

- **Postman:** https://www.postman.com/downloads/
- **Insomnia:** https://insomnia.rest/download

#### 2️⃣ Faça Login como Admin:

**Endpoint:** `POST http://localhost:3000/api/auth/login`

**Body (JSON):**

```json
{
  "email": "admin@hypemode.com",
  "password": "Admin123!"
}
```

**Resposta:** Copie o `token` que você receber.

#### 3️⃣ Configure o Header de Autenticação:

Adicione este header em todas as requisições:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

#### 4️⃣ Criar Produto:

**Endpoint:** `POST http://localhost:3000/api/products`

**Headers:**

```
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "name": "Bomber Jacket Premium",
  "description": "Jaqueta bomber de alta qualidade com design moderno",
  "price": 149.99,
  "originalPrice": 199.99,
  "discount": true,
  "discountPercentage": 25,
  "category": "Jackets",
  "subcategory": "Bomber",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black", "Navy", "Olive"],
  "image": "/images/Home/Categories/hypemode-jacket.png",
  "stock": 50,
  "rating": 4.5,
  "reviewsCount": 23,
  "featured": true,
  "newArrival": true,
  "bestSeller": false
}
```

#### 5️⃣ Editar Produto:

**Endpoint:** `PUT http://localhost:3000/api/products/1`

**Headers:** (mesmos de cima)

**Body (JSON):**

```json
{
  "price": 139.99,
  "stock": 45,
  "discount": false
}
```

#### 6️⃣ Deletar Produto:

**Endpoint:** `DELETE http://localhost:3000/api/products/1`

**Headers:** (mesmos de cima)

---

### ✅ **Opção 2: Via Terminal (cURL)**

```bash
# 1. Login e guardar token
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hypemode.com","password":"Admin123!"}' \
  | grep -o '"token":"[^"]*' | grep -o '[^"]*$')

echo "Token: $TOKEN"

# 2. Criar produto
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Meu Novo Produto",
    "description": "Descrição completa",
    "price": 99.99,
    "discount": true,
    "discountPercentage": 20,
    "category": "T-Shirts",
    "sizes": ["S", "M", "L"],
    "colors": ["Black", "White"],
    "stock": 100,
    "image": "/images/produto.jpg"
  }'

# 3. Editar produto (ID 1)
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 89.99,
    "stock": 95
  }'

# 4. Ver todos os produtos
curl http://localhost:3000/api/products

# 5. Ver produto específico
curl http://localhost:3000/api/products/1

# 6. Deletar produto
curl -X DELETE http://localhost:3000/api/products/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

### ✅ **Opção 3: Criar Interface Admin no Frontend**

Você pode criar páginas de administração no seu React:

```javascript
// src/pages/admin/ProductsAdmin.jsx
import { useState, useEffect } from 'react';
import { productAPI, authAPI } from '../../utils/api/apiService';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Jackets',
    discount: false,
    discountPercentage: 0,
    sizes: [],
    stock: 0,
  });

  // Verificar se é admin
  useEffect(() => {
    if (!authAPI.isAdmin()) {
      window.location.href = '/login';
    }
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await productAPI.getAll();
    setProducts(response.data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productAPI.create(formData);
      alert('Produto criado!');
      loadProducts();
    } catch (error) {
      alert('Erro ao criar produto');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Deletar produto?')) {
      await productAPI.delete(id);
      loadProducts();
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Admin - Gerenciar Produtos</h1>

      {/* Formulário para criar produto */}
      <form onSubmit={handleSubmit} className='mb-8 bg-white p-6 rounded shadow'>
        <h2 className='text-xl mb-4'>Adicionar Novo Produto</h2>

        <input
          type='text'
          placeholder='Nome do Produto'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className='border p-2 mb-2 w-full'
          required
        />

        <input
          type='number'
          placeholder='Preço'
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className='border p-2 mb-2 w-full'
          required
        />

        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className='border p-2 mb-2 w-full'
        >
          <option>Jackets</option>
          <option>Sweaters</option>
          <option>T-Shirts</option>
          <option>Accessories</option>
          <option>Shoes</option>
        </select>

        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
          Criar Produto
        </button>
      </form>

      {/* Lista de produtos */}
      <div className='bg-white p-6 rounded shadow'>
        <h2 className='text-xl mb-4'>Produtos Existentes</h2>
        <table className='w-full'>
          <thead>
            <tr className='border-b'>
              <th className='text-left p-2'>ID</th>
              <th className='text-left p-2'>Nome</th>
              <th className='text-left p-2'>Preço</th>
              <th className='text-left p-2'>Estoque</th>
              <th className='text-left p-2'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className='border-b'>
                <td className='p-2'>{product.id}</td>
                <td className='p-2'>{product.name}</td>
                <td className='p-2'>${product.price}</td>
                <td className='p-2'>{product.stock}</td>
                <td className='p-2'>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className='bg-red-500 text-white px-3 py-1 rounded text-sm'
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

**Para usar:**

1. Crie o arquivo acima
2. Adicione a rota no seu router
3. Acesse `/admin/products` logado como admin

---

## 📊 Ver Produtos no Banco de Dados

### Via MySQL Workbench (GUI):

1. Baixe: https://dev.mysql.com/downloads/workbench/
2. Conecte ao MySQL
3. Abra o banco `hypemode_ecommerce`
4. Veja a tabela `products`

### Via Terminal:

```bash
mysql -u root -p
USE hypemode_ecommerce;

-- Ver todos os produtos
SELECT * FROM products;

-- Ver campos específicos
SELECT id, name, price, discount, stock, category FROM products;

-- Adicionar produto direto no SQL (não recomendado)
INSERT INTO products (name, price, category, stock, discount, createdAt, updatedAt)
VALUES ('Novo Produto', 99.99, 'Jackets', 50, false, NOW(), NOW());

-- Editar produto
UPDATE products SET price = 89.99, stock = 45 WHERE id = 1;

-- Deletar produto
DELETE FROM products WHERE id = 1;
```

---

## 📋 Campos do Produto

Campos que você pode definir ao criar/editar:

```javascript
{
  name: "Nome do Produto",              // Obrigatório
  description: "Descrição detalhada",
  price: 99.99,                         // Obrigatório
  originalPrice: 149.99,                // Opcional
  discount: true,                       // true/false
  discountPercentage: 25,               // 0-100
  category: "Jackets",                  // Obrigatório
  subcategory: "Bomber",
  sizes: ["S", "M", "L", "XL"],        // Array
  colors: ["Black", "White"],           // Array
  image: "/path/image.jpg",
  images: ["/img1.jpg", "/img2.jpg"],  // Array
  stock: 50,                            // Obrigatório
  rating: 4.5,
  reviewsCount: 23,
  featured: true,                       // Produto em destaque
  newArrival: true,                     // Novo produto
  bestSeller: false,                    // Best seller
  active: true                          // Ativo/Inativo
}
```

---

## 🎯 Categorias Disponíveis

- `Jackets`
- `Sweaters`
- `T-Shirts`
- `Accessories`
- `Shoes`

---

## 💡 Dicas

1. **Sempre faça login como admin** antes de criar/editar produtos
2. **Use Postman** para facilitar - é mais visual que o terminal
3. **Crie uma interface admin** se você vai gerenciar muitos produtos
4. **Os produtos aparecem automaticamente** no frontend após serem criados
5. **Valide os campos obrigatórios:** name, price, category, stock

---

## 🔐 Credenciais Admin

**Email:** `admin@hypemode.com`  
**Senha:** `Admin123!`

---

## 🚨 Troubleshooting

### "Unauthorized" ou "Token invalid"

- Faça login novamente para obter um novo token
- Tokens expiram em 7 dias

### "Not authorized" ou "User role 'user' is not authorized"

- Você precisa estar logado como **admin**
- Use as credenciais acima

### Produtos não aparecem no frontend

- Verifique se o backend está rodando
- Veja se os produtos existem no banco: `SELECT * FROM products;`
- Confira se `active = 1` na tabela

---

## 📚 Documentação Adicional

- **Exemplos completos:** `backend/EXEMPLOS_API.md`
- **Documentação da API:** `backend/README.md`

---

**Pronto! Agora você sabe onde estão e como gerenciar seus produtos!** 🎉

