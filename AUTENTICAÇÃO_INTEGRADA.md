# 🔐 Autenticação e Carrinho - Totalmente Integrados!

## ✅ O Que Foi Implementado

### **Login e Register agora salvam no Backend MySQL!**

✅ **Login** guarda utilizadores no backend  
✅ **Register** cria conta no MySQL  
✅ **Carrinho** sincroniza automaticamente ao fazer login  
✅ **Token JWT** salvo automaticamente  
✅ **Fallback** para localStorage se API falhar

---

## 🎯 Como Funciona Agora

### **1. Register (Criar Conta)**

Quando alguém se registra:

1. **Dados são enviados** para `POST /api/auth/register`
2. **Senha é hasheada** com bcrypt no backend
3. **Utilizador é salvo** na tabela `users` do MySQL
4. **Token JWT é retornado** e salvo no localStorage
5. **Carrinho do localStorage** é sincronizado com o backend
6. **Utilizador é automaticamente logado**

**Dados Salvos no MySQL:**

```sql
INSERT INTO users (name, email, password, role, createdAt, updatedAt)
VALUES ('João Silva', 'joao@example.com', '$2a$10$hashedpassword...', 'user', NOW(), NOW());
```

---

### **2. Login (Entrar)**

Quando alguém faz login:

1. **Credenciais enviadas** para `POST /api/auth/login`
2. **Backend verifica** email e senha (bcrypt compare)
3. **Token JWT é gerado** e retornado
4. **Token salvo** no localStorage
5. **Dados do utilizador** salvos no localStorage
6. **Carrinho local sincroniza** com o backend
7. **Carrinho passa a vir** do MySQL

---

### **3. Carrinho Inteligente**

#### **Não Logado (Visitante):**

- 📦 Carrinho salvo no **localStorage**
- 💾 Produtos ficam no navegador
- ⚡ Super rápido (sem rede)

#### **Logado (Utilizador):**

- 🗄️ Carrinho salvo no **MySQL**
- 🔄 Sincroniza entre dispositivos
- 💪 Persiste para sempre
- 🔐 Seguro e privado

#### **Ao Fazer Login:**

- 🔄 Produtos do localStorage **migram** para o backend
- 🧹 localStorage é limpo
- ✨ Carrinho agora vem do MySQL

---

## 🧪 Como Testar

### **Teste 1: Criar Conta Nova**

1. **Acesse:**

   ```
   http://localhost:5173/register
   ```

2. **Preencha o formulário:**

   - First Name: `Maria`
   - Last Name: `Silva`
   - Date of Birth: `1990-01-01`
   - Email: `maria@example.com`
   - Username: `maria_silva`
   - Password: `MinhaSenh@123`
   - Confirm Password: `MinhaSenh@123`

3. **Clique em "CREATE ACCOUNT"**

4. **Verifique no MySQL:**

   ```bash
   mysql -u root -p
   USE hypemode_ecommerce;
   SELECT id, name, email, role FROM users;
   ```

   Você deve ver:

   ```
   +----+-------------+-------------------+-------+
   | id | name        | email             | role  |
   +----+-------------+-------------------+-------+
   | 1  | Admin User  | admin@hypemode... | admin |
   | 2  | John Doe    | john@example.com  | user  |
   | 3  | Maria Silva | maria@example.com | user  |
   +----+-------------+-------------------+-------+
   ```

✅ **Utilizador criado no MySQL!**

---

### **Teste 2: Fazer Login**

1. **Acesse:**

   ```
   http://localhost:5173/login
   ```

2. **Use credenciais de teste:**

   - Email: `john@example.com`
   - Password: `User123!`

3. **Clique em "LOGIN"**

4. **Verifique no Console (F12):**

   ```javascript
   // Ver token
   console.log(localStorage.getItem('token'));

   // Ver dados do utilizador
   console.log(JSON.parse(localStorage.getItem('user')));
   ```

✅ **Login feito com sucesso!**

---

### **Teste 3: Carrinho com Login**

#### **Parte A: Adicionar Produtos SEM Login**

1. **SEM fazer login**, adicione 2 produtos ao carrinho

2. **Verifique no DevTools:**
   ```javascript
   console.table(JSON.parse(localStorage.getItem('cart')));
   // Deve mostrar 2 produtos
   ```

#### **Parte B: Fazer Login e Sincronizar**

3. **Faça login** com `john@example.com` / `User123!`

4. **Os produtos foram sincronizados!** Verifique:

   **No Console:**

   ```javascript
   console.table(JSON.parse(localStorage.getItem('cart')));
   // Deve estar vazio agora
   ```

   **No MySQL:**

   ```bash
   mysql -u root -p
   USE hypemode_ecommerce;

   SELECT
     c.id,
     u.name as usuario,
     p.name as produto,
     c.quantity,
     c.size
   FROM carts c
   JOIN users u ON c.userId = u.id
   JOIN products p ON c.productId = p.id;
   ```

   Resultado:

   ```
   +----+-----------+---------------------+----------+------+
   | id | usuario   | produto             | quantity | size |
   +----+-----------+---------------------+----------+------+
   | 1  | John Doe  | Urban Bomber Jacket | 1        | M    |
   | 2  | John Doe  | Cozy Knit Sweater   | 1        | L    |
   +----+-----------+---------------------+----------+------+
   ```

✅ **Carrinho sincronizado no MySQL!**

#### **Parte C: Testar Persistência**

5. **Feche o navegador completamente**

6. **Abra novamente e faça login**

7. **O carrinho ainda está lá!** ✨

---

### **Teste 4: Carrinho em Múltiplos Dispositivos**

1. **No Chrome:**

   - Faça login com `john@example.com`
   - Adicione 2 produtos ao carrinho

2. **No Firefox (ou modo anônimo):**
   - Faça login com `john@example.com`
   - **Os 2 produtos estão lá!** 🎉

✅ **Sincronização entre dispositivos funcionando!**

---

## 🔍 Verificar no DevTools

### **Application Tab:**

```
Local Storage → http://localhost:5173
├── token         → eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
├── user          → {"id":2,"name":"John Doe","email":"john@...","role":"user"}
└── cart          → [] (vazio se logado, pois vem do backend)
```

### **Console Commands:**

```javascript
// 1. Verificar se está logado
import { authAPI } from './src/utils/api/apiService';
console.log('Logado?', authAPI.isAuthenticated());

// 2. Ver dados do utilizador
console.log('Utilizador:', authAPI.getCurrentUser());

// 3. Ver token
console.log('Token:', localStorage.getItem('token'));

// 4. Testar API do carrinho
fetch('http://localhost:3000/api/cart', {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log('Carrinho do Backend:');
    console.table(data.data);
  });
```

---

## 📊 Fluxo Completo

### **Visitante → Cliente Registrado:**

```
1. Visitante adiciona produtos ao carrinho
   ↓ (localStorage)

2. Visitante cria conta (Register)
   ↓ POST /api/auth/register
   ↓ Utilizador salvo no MySQL
   ↓ Token recebido

3. Carrinho sincroniza automaticamente
   ↓ POST /api/cart (para cada produto)
   ↓ Produtos salvos no MySQL
   ↓ localStorage limpo

4. Carrinho agora vem do backend
   ↓ GET /api/cart
   ↓ Sincronizado em todos os dispositivos
```

---

## 🎯 Credenciais de Teste

**Existentes no banco:**

- **Admin:**

  - Email: `admin@hypemode.com`
  - Senha: `Admin123!`

- **Utilizador:**
  - Email: `john@example.com`
  - Senha: `User123!`

**Crie suas próprias:**

- Vá para `/register` e crie uma nova conta!

---

## 🔐 Segurança Implementada

✅ **Senhas hasheadas** com bcrypt (salt rounds: 10)  
✅ **Tokens JWT** com expiração de 7 dias  
✅ **Validação de email** único no backend  
✅ **Validação de campos** obrigatórios  
✅ **Proteção contra SQL injection** (Sequelize ORM)  
✅ **Rate limiting** (100 req/15min)  
✅ **CORS** configurado

---

## 📝 Dados Salvos no Backend

### **Tabela `users`:**

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,    -- Hasheada
  role ENUM('user', 'admin') DEFAULT 'user',
  phone VARCHAR(255),
  address TEXT,
  city VARCHAR(255),
  postalCode VARCHAR(255),
  country VARCHAR(255),
  createdAt DATETIME,
  updatedAt DATETIME
);
```

### **Tabela `carts`:**

```sql
CREATE TABLE carts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,               -- FK para users
  productId INT NOT NULL,            -- FK para products
  quantity INT NOT NULL DEFAULT 1,
  size VARCHAR(255),
  color VARCHAR(255),
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);
```

---

## 🚨 Erros Comuns e Soluções

### **Erro: "User already exists"**

**Causa:** Email já registrado

**Solução:** Use outro email ou faça login com o existente

---

### **Erro: "Invalid credentials"**

**Causa:** Email ou senha incorretos

**Solução:** Verifique as credenciais ou crie nova conta

---

### **Erro: "Token is not valid"**

**Causa:** Token expirado ou inválido

**Solução:** Faça login novamente

---

### **Erro: "Cannot connect to backend"**

**Causa:** Backend não está rodando

**Solução:**

```bash
cd backend
npm run dev
```

---

## 🎉 Resumo Final

| Funcionalidade             | Antes           | Agora            |
| -------------------------- | --------------- | ---------------- |
| **Login**                  | ❌ Simulado     | ✅ Backend MySQL |
| **Register**               | ❌ Simulado     | ✅ Backend MySQL |
| **Carrinho (não logado)**  | ✅ localStorage | ✅ localStorage  |
| **Carrinho (logado)**      | ❌ localStorage | ✅ Backend MySQL |
| **Sincronização**          | ❌ Não          | ✅ Automática    |
| **Múltiplos dispositivos** | ❌ Não          | ✅ Sim           |
| **Persistência**           | ❌ Temporária   | ✅ Permanente    |
| **Segurança**              | ❌ Nenhuma      | ✅ JWT + bcrypt  |

---

## 🚀 Teste Agora!

### **Passo a Passo Completo:**

1. **Abra o site:**

   ```
   http://localhost:5173
   ```

2. **Adicione 2 produtos ao carrinho** (sem login)

3. **Vá para Register:**

   ```
   http://localhost:5173/register
   ```

4. **Crie uma conta nova**

5. **Automaticamente:**

   - ✅ Conta criada no MySQL
   - ✅ Login feito automaticamente
   - ✅ Carrinho sincronizado
   - ✅ Token salvo

6. **Verifique no MySQL:**

   ```bash
   mysql -u root -p
   USE hypemode_ecommerce;

   -- Ver seu utilizador
   SELECT * FROM users WHERE email = 'seu_email@example.com';

   -- Ver seu carrinho
   SELECT * FROM carts WHERE userId = (SELECT id FROM users WHERE email = 'seu_email@example.com');
   ```

---

**🎉 Login, Register e Carrinho totalmente integrados com MySQL!**

Agora todos os dados ficam guardados de forma segura no backend!
