# 🚀 Quick Start - HypeMode E-Commerce

## Objetivo

Colocar a aplicação completa (frontend + backend) rodando em **5 minutos**.

---

## Pré-requisitos

✅ **Node.js** >= 18 instalado  
✅ **MySQL** >= 8.0 instalado e rodando  
✅ **Git** instalado

---

## Passo 1: Configurar MySQL (1 minuto)

Abra o terminal e execute:

```bash
# Acesse o MySQL
mysql -u root -p

# Crie o banco de dados
CREATE DATABASE hypemode_ecommerce;

# Saia do MySQL
exit;
```

✅ **Banco de dados criado!**

---

## Passo 2: Instalar Dependências do Backend (1 minuto)

```bash
cd backend
npm install
```

⏳ Aguarde a instalação...

✅ **Dependências do backend instaladas!**

---

## Passo 3: Configurar Variáveis de Ambiente (30 segundos)

O arquivo `.env` já está criado com valores padrão.

**⚠️ IMPORTANTE:** Se você tem senha no MySQL, edite o arquivo:

```bash
# Abra o arquivo .env
nano .env  # ou use seu editor preferido

# Encontre a linha DB_PASSWORD e adicione sua senha:
DB_PASSWORD=sua_senha_aqui

# Salve e feche (Ctrl+X, Y, Enter no nano)
```

Se você **não tem senha** no MySQL, pode pular este passo.

✅ **Configuração pronta!**

---

## Passo 4: Popular o Banco de Dados (30 segundos)

Ainda na pasta `backend`, execute:

```bash
npm run db:seed
```

Você verá:

```
🚀 Starting database seeding...
✅ Database connection established successfully.
🌱 Seeding users...
✅ Users seeded successfully
🌱 Seeding products...
✅ Products seeded successfully
🎉 Database seeding completed successfully!
```

✅ **15 produtos e 2 usuários criados!**

---

## Passo 5: Iniciar o Backend (10 segundos)

Ainda na pasta `backend`:

```bash
npm run dev
```

Você verá:

```
🚀 Server is running on port 3000
📝 Environment: development
🔗 API URL: http://localhost:3000/api
```

✅ **Backend rodando na porta 3000!**

**🎯 Deixe este terminal aberto.**

---

## Passo 6: Instalar Dependências do Frontend (1 minuto)

Abra um **NOVO TERMINAL** e execute:

```bash
# Volte para a raiz do projeto
cd ..

# Instale as dependências
npm install
```

✅ **Dependências do frontend instaladas!**

---

## Passo 7: Iniciar o Frontend (10 segundos)

No mesmo terminal:

```bash
npm run dev
```

Você verá:

```
VITE v6.2.0  ready in 200 ms

➜  Local:   http://localhost:5173/
```

✅ **Frontend rodando na porta 5173!**

---

## Passo 8: Testar a Aplicação (2 minutos)

### 1. Acesse no navegador:

```
http://localhost:5173
```

### 2. Veja os produtos carregados da API!

### 3. Teste o Login:

**Admin:**

- Email: `admin@hypemode.com`
- Senha: `Admin123!`

**Usuário:**

- Email: `john@example.com`
- Senha: `User123!`

### 4. Teste a API diretamente:

Abra um novo terminal e teste:

```bash
# Verificar saúde do servidor
curl http://localhost:3000/health

# Listar produtos
curl http://localhost:3000/api/products

# Fazer login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hypemode.com","password":"Admin123!"}'
```

✅ **Tudo funcionando!**

---

## 🎉 Pronto!

Você agora tem:

- ✅ Backend API rodando (porta 3000)
- ✅ Frontend React rodando (porta 5173)
- ✅ MySQL com 15 produtos
- ✅ 2 usuários (admin + user)
- ✅ Autenticação JWT funcionando
- ✅ Carrinho persistente
- ✅ Sistema de pedidos

---

## 🔥 Próximos Passos

1. **Explore a documentação da API:** `backend/README.md`
2. **Veja o guia de migração:** `MIGRAÇÃO_PARA_API.md`
3. **Adicione seus próprios produtos** (via API ou interface)
4. **Configure o Stripe** para pagamentos reais (opcional)

---

## ❓ Problemas?

### Erro: "Access denied for user"

→ Verifique a senha no `backend/.env`

### Erro: "Unknown database"

→ Execute: `CREATE DATABASE hypemode_ecommerce;` no MySQL

### Erro: "Port 3000 already in use"

→ Mude a porta no `backend/.env`: `PORT=3001`

### Erro: "Cannot connect to MySQL"

→ Verifique se o MySQL está rodando:

```bash
# macOS
brew services list

# Linux
sudo systemctl status mysql
```

### Produtos não aparecem no frontend

→ Certifique-se que:

1. O backend está rodando (porta 3000)
2. O arquivo `.env` na raiz tem: `VITE_API_URL=http://localhost:3000/api`
3. Execute `npm run db:seed` no backend

---

## 📚 Documentação

- **README Principal:** `README.md`
- **Guia de Migração:** `MIGRAÇÃO_PARA_API.md`
- **API Backend:** `backend/README.md`
- **Setup Detalhado:** `backend/SETUP.md`

---

**🚀 Enjoy coding!**

