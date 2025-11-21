# 🚀 Quick Start - Clean Architecture Backend

## 📋 Resumo Rápido

Este backend foi feito para seguir **Clean Architecture** com os padrões aprendidos nas aulas.

## 🏗️ Estrutura Simplificada

```
src/
├── use-cases/          # 💼 Lógica de Negócio
├── repositories/       # 💾 Acesso a Dados
├── controllers/        # 🎮 HTTP Handlers
├── routes/             # 🛣️ Rotas
├── middleware/         # 🔒 Middlewares
└── models/             # 📦 Models Sequelize
```

## 🎯 Fluxo Básico

```
Request → Route → Controller → Factory → Use Case → Repository → Database
```

## 💡 Exemplo Rápido: Registro de Usuário

### 1️⃣ Use Case (Lógica)

```javascript
// use-cases/register-use-case.js
export class RegisterUseCase {
  async execute({ email, password }) {
    // Verificar se existe
    const exists = await this.usersRepository.findByEmail(email);
    if (exists) throw new UserAlreadyExistsError();

    // Criar usuário
    const user = await this.usersRepository.create({ email, password });
    return { user, token: generateToken(user.id) };
  }
}
```

### 2️⃣ Factory (Injeção)

```javascript
// use-cases/factories/make-register-use-case.js
export function makeRegisterUseCase() {
  const usersRepository = new SequelizeUsersRepository();
  return new RegisterUseCase(usersRepository);
}
```

### 3️⃣ Controller (HTTP)

```javascript
// controllers/authController.js
export const register = async (req, res, next) => {
  try {
    const registerUseCase = makeRegisterUseCase();
    const result = await registerUseCase.execute(req.body);
    return res.status(201).json({ success: true, ...result });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).json({ success: false, message: error.message });
    }
    next(error);
  }
};
```

## 📁 Arquivos Principais

### Use Cases (Lógica de Negócio)

- `register-use-case.js` - Registro
- `authenticate-use-case.js` - Login
- `get-products-use-case.js` - Listar produtos
- `get-product-use-case.js` - Buscar produto

### Repositories (Dados)

- `users-repository.js` - Interface
- `products-repository.js` - Interface
- `sequelize/sequelize-users-repository.js` - Implementação
- `sequelize/sequelize-products-repository.js` - Implementação

### Custom Errors

- `user-already-exists-error.js`
- `invalid-credentials-error.js`
- `resource-not-found-error.js`

## 🧪 Testar API

```bash
# Listar produtos
curl 'http://localhost:3000/api/products?limit=5'

# Buscar produto por ID
curl 'http://localhost:3000/api/products/1'

# Registrar usuário
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"Test123!"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!"}'
```

## 📚 Documentação Completa

- 📖 **ARCHITECTURE.md** - Arquitetura detalhada
- 📝 **REFACTORING_SUMMARY.md** - Resumo das mudanças
- 💡 **EXAMPLES.md** - Exemplos práticos e testes
- 🚀 **README_REFACTORING.md** - Resumo completo

## 🎓 Padrões Aplicados

✅ Clean Architecture  
✅ SOLID Principles  
✅ Use Case Pattern  
✅ Repository Pattern  
✅ Dependency Injection  
✅ Custom Domain Errors

## 🔄 Como Adicionar Nova Feature

1. Criar Use Case em `use-cases/`
2. Criar Factory em `use-cases/factories/`
3. Adicionar no Controller
4. Adicionar Rota

**Exemplo completo em `EXAMPLES.md`**

## 🎯 Status

✅ **Backend refatorado e funcionando!**

Todos os endpoints continuam funcionando, mas agora com uma arquitetura muito melhor seguindo os padrões das aulas.

---

**Baseado no projeto GymSpot** (flag-88315-nodejs-main/9-gymspot)
