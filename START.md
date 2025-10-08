# 🚀 Iniciar Seu E-commerce (Live)

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter:

- ✅ MySQL instalado e rodando
- ✅ Banco de dados criado (`hypemode_ecommerce`)
- ✅ Dependências instaladas

---

## 🎯 Iniciar em 3 Passos

### **Passo 1: Verificar/Criar Banco de Dados**

Se ainda não criou o banco:

```bash
mysql -u root -p
# Digite sua senha do MySQL

# Dentro do MySQL:
CREATE DATABASE hypemode_ecommerce;
exit;
```

### **Passo 2: Backend (Terminal 1)**

```bash
# Vá para a pasta do backend
cd backend

# Se ainda não instalou as dependências:
npm install

# Se ainda não populou o banco (primeira vez):
npm run db:seed

# Iniciar o servidor backend
npm run dev
```

Você verá:

```
✅ Database connection established successfully.
🚀 Server is running on port 3000
📝 Environment: development
🔗 API URL: http://localhost:3000/api
```

✅ **Backend rodando!** Deixe este terminal aberto.

### **Passo 3: Frontend (Terminal 2)**

Abra um **NOVO TERMINAL** e execute:

```bash
# Se estiver na pasta backend, volte para raiz:
cd ..

# Se ainda não instalou as dependências:
npm install

# Iniciar o frontend
npm run dev
```

Você verá:

```
VITE v6.2.0  ready in 200 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🌐 Acessar Seu Site

Abra o navegador e acesse:

```
http://localhost:5173
```

Ou simplesmente segure **CMD (Mac)** ou **CTRL (Windows)** e clique no link no terminal!

---

## ✅ Verificar se Está Funcionando

### 1. **Produtos Carregam?**

- A página inicial deve mostrar produtos
- Se não aparecerem, verifique se o backend está rodando

### 2. **Testar Login Admin:**

- Clique em "Login" (se tiver na navbar)
- Use: `admin@hypemode.com` / `Admin123!`

### 3. **Testar Busca:**

- Digite algo na barra de busca
- Deve funcionar!

---

## 🔧 Troubleshooting

### ❌ Produtos não aparecem

**Verifique:**

1. Backend está rodando? (Terminal 1 deve estar ativo)
2. Banco de dados tem produtos? Execute:
   ```bash
   mysql -u root -p
   USE hypemode_ecommerce;
   SELECT COUNT(*) FROM products;
   # Deve retornar 15 produtos
   ```
3. Se retornar 0, execute: `npm run db:seed` no terminal do backend

### ❌ Erro "Cannot connect to MySQL"

**Verifique se o MySQL está rodando:**

**macOS:**

```bash
brew services list
# Se não estiver rodando:
brew services start mysql
```

**Linux:**

```bash
sudo systemctl status mysql
# Se não estiver rodando:
sudo systemctl start mysql
```

**Windows:**

- Abra "Serviços" (services.msc)
- Procure "MySQL"
- Inicie o serviço

### ❌ Erro "Port 3000 already in use"

Algo já está usando a porta 3000. Para liberar:

**macOS/Linux:**

```bash
lsof -ti:3000 | xargs kill -9
```

**Windows:**

```bash
netstat -ano | findstr :3000
taskkill /PID [número_do_PID] /F
```

Ou mude a porta no `backend/.env`:

```env
PORT=3001
```

E no `.env` da raiz:

```env
VITE_API_URL=http://localhost:3001/api
```

### ❌ Página em branco

1. Verifique o console do navegador (F12)
2. Veja se há erros
3. Certifique-se que ambos os servidores estão rodando

---

## 🎨 O Que Você Deve Ver

### Página Inicial (`/`)

- Header com logo
- Produtos em destaque
- Categorias
- Newsletter

### Produtos (`/products`)

- Lista de todos os produtos
- Filtros (categoria, preço)
- Busca funcionando

### Detalhes do Produto (`/products/:id`)

- Informações do produto
- Tamanhos disponíveis
- Botão "Adicionar ao Carrinho"

---

## 📊 Status dos Servidores

Você deve ter **2 terminais abertos**:

### Terminal 1 - Backend

```
🚀 Server is running on port 3000
```

### Terminal 2 - Frontend

```
➜  Local:   http://localhost:5173/
```

---

## 🛑 Para Parar os Servidores

Em cada terminal, pressione:

```
CTRL + C
```

---

## 📚 Próximos Passos

Depois que estiver funcionando:

1. **Adicionar seus produtos** - Veja `GERENCIAR_PRODUTOS.md`
2. **Testar todas as páginas**
3. **Customizar o design**
4. **Adicionar mais funcionalidades**

---

## 🎉 Tudo Pronto!

Seu e-commerce está rodando em:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Health Check:** http://localhost:3000/health

**Divirta-se!** 🚀

