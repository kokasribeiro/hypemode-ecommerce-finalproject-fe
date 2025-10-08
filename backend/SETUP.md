# 🚀 Guia de Configuração Rápida

## Passo a Passo para Iniciar

### 1. Instalar MySQL (se ainda não tiver)

**macOS:**

```bash
brew install mysql
brew services start mysql
```

**Windows:**

- Baixe o [MySQL Installer](https://dev.mysql.com/downloads/installer/)
- Siga as instruções de instalação

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### 2. Criar o Banco de Dados

Acesse o MySQL:

```bash
mysql -u root -p
```

Crie o banco de dados:

```sql
CREATE DATABASE hypemode_ecommerce;
exit;
```

### 3. Instalar Dependências do Backend

```bash
cd backend
npm install
```

### 4. Configurar Variáveis de Ambiente

O arquivo `.env` já está configurado com valores padrão. **Edite apenas se necessário:**

```bash
# Abra o arquivo .env e ajuste as credenciais do MySQL se necessário
nano .env
```

**Configurações importantes:**

- `DB_PASSWORD` - Senha do MySQL (deixe vazio se não tiver senha)
- `DB_USER` - Usuário do MySQL (padrão: root)
- `JWT_SECRET` - Já configurado (altere em produção)

### 5. Popular o Banco de Dados

Este comando irá criar as tabelas e adicionar produtos de exemplo:

```bash
npm run db:seed
```

Você verá uma saída como:

```
🚀 Starting database seeding...
✅ Database connection established successfully.
⚠️  Syncing database (this will drop existing data)...
✅ Database synced successfully (force mode).
🌱 Seeding users...
✅ Users seeded successfully
🌱 Seeding products...
✅ Products seeded successfully
🎉 Database seeding completed successfully!

📝 Login credentials:
   Admin: admin@hypemode.com / Admin123!
   User:  john@example.com / User123!
```

### 6. Iniciar o Servidor Backend

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### 7. Configurar o Frontend

Volte para a pasta raiz do projeto:

```bash
cd ..
```

O arquivo `.env` do frontend já está configurado. Instale as dependências (se ainda não fez):

```bash
npm install
```

### 8. Iniciar o Frontend

```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## ✅ Teste a API

Acesse no navegador ou use curl/Postman:

```bash
# Verificar se o servidor está rodando
curl http://localhost:3000/health

# Listar produtos
curl http://localhost:3000/api/products

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hypemode.com","password":"Admin123!"}'
```

## 🎯 Credenciais de Teste

**Admin:**

- Email: `admin@hypemode.com`
- Senha: `Admin123!`

**Usuário:**

- Email: `john@example.com`
- Senha: `User123!`

## 📋 Comandos Úteis

```bash
# Backend
cd backend
npm run dev          # Iniciar servidor em modo desenvolvimento
npm start           # Iniciar servidor em modo produção
npm run db:seed     # Popular banco de dados (APAGA dados existentes)

# Frontend
npm run dev         # Iniciar frontend
npm run build       # Build para produção
npm run preview     # Visualizar build
```

## 🔧 Troubleshooting

### Erro: "Access denied for user"

- Verifique usuário e senha no `.env`
- Certifique-se que o MySQL está rodando

### Erro: "Unknown database"

- Execute: `CREATE DATABASE hypemode_ecommerce;` no MySQL

### Erro: "Port 3000 already in use"

- Mude a porta no `.env`: `PORT=3001`
- Ou mate o processo: `lsof -ti:3000 | xargs kill -9`

### Erro: "Cannot connect to MySQL"

- Verifique se o MySQL está rodando:
  - macOS: `brew services list`
  - Linux: `sudo systemctl status mysql`
  - Windows: Services > MySQL

### Produtos não aparecem no frontend

- Certifique-se que o backend está rodando
- Verifique se o `.env` do frontend tem `VITE_API_URL=http://localhost:3000/api`
- Verifique o console do navegador para erros

## 🎉 Pronto!

Agora você tem:

- ✅ Backend API rodando com MySQL
- ✅ 15 produtos de exemplo cadastrados
- ✅ Autenticação funcionando
- ✅ Frontend conectado à API real

Para adicionar/editar produtos, use as credenciais de **admin** e faça requisições para a API ou crie uma interface de administração!

