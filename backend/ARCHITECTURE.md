# 🏗️ Backend Architecture - Clean Architecture Pattern

Este backend segue os padrões de **Clean Architecture** e **SOLID principles** aprendidos nas aulas.

## 📁 Estrutura de Pastas

```
backend/src/
├── controllers/          # Camada de apresentação (HTTP handlers)
├── use-cases/           # Camada de lógica de negócio
│   ├── errors/          # Custom errors específicos do domínio
│   └── factories/       # Dependency Injection factories
├── repositories/        # Camada de acesso a dados
│   └── sequelize/       # Implementação Sequelize dos repositories
├── models/              # Modelos Sequelize (ORM)
├── middleware/          # Express middlewares
├── routes/              # Definição de rotas
├── schemas/             # Validação com Zod
└── utils/               # Utilitários gerais
```

## 🎯 Padrões Implementados

### 1. **Use Cases (Business Logic)**

Cada funcionalidade é um Use Case isolado que contém a lógica de negócio:

```javascript
// use-cases/register-use-case.js
export class RegisterUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password }) {
    // 1. Verificar se usuário existe
    const userExists = await this.usersRepository.findByEmail(email);
    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    // 2. Criar usuário
    const user = await this.usersRepository.create({ name, email, password });

    // 3. Retornar resultado
    return { user, token: generateToken(user.id) };
  }
}
```

**Vantagens:**

- ✅ Lógica de negócio isolada e testável
- ✅ Fácil de entender e manter
- ✅ Reutilizável em diferentes contextos

### 2. **Repository Pattern**

Abstração da camada de dados com interfaces:

```javascript
// repositories/users-repository.js (Interface)
export class UsersRepository {
  async findById(id) {
    throw new Error('Method must be implemented');
  }
  async findByEmail(email) {
    throw new Error('Method must be implemented');
  }
  async create(data) {
    throw new Error('Method must be implemented');
  }
}

// repositories/sequelize/sequelize-users-repository.js (Implementação)
export class SequelizeUsersRepository extends UsersRepository {
  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }
  // ... outras implementações
}
```

**Vantagens:**

- ✅ Desacoplamento da lógica de negócio do ORM
- ✅ Fácil trocar de banco de dados (Sequelize → Prisma)
- ✅ Facilita testes unitários (mock repositories)

### 3. **Dependency Injection via Factories**

Factories criam instâncias com dependências injetadas:

```javascript
// use-cases/factories/make-register-use-case.js
export function makeRegisterUseCase() {
  const usersRepository = new SequelizeUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);
  return registerUseCase;
}
```

**Vantagens:**

- ✅ Controle centralizado de dependências
- ✅ Fácil substituir implementações
- ✅ Facilita testes (injetar mocks)

### 4. **Custom Domain Errors**

Erros específicos do domínio para melhor tratamento:

```javascript
// use-cases/errors/user-already-exists-error.js
export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists with this email');
    this.name = 'UserAlreadyExistsError';
  }
}
```

**Uso nos Controllers:**

```javascript
try {
  const registerUseCase = makeRegisterUseCase();
  const result = await registerUseCase.execute(data);
  return res.status(201).json({ success: true, ...result });
} catch (error) {
  if (error instanceof UserAlreadyExistsError) {
    return res.status(409).json({ success: false, message: error.message });
  }
  next(error); // Outros erros vão para o error handler
}
```

**Vantagens:**

- ✅ Tratamento de erros específico e semântico
- ✅ HTTP status codes corretos
- ✅ Mensagens de erro claras

## 📊 Fluxo de Dados (Request → Response)

```
1. HTTP Request
   ↓
2. Route (routes/authRoutes.js)
   ↓
3. Validation Middleware (Zod schemas)
   ↓
4. Controller (controllers/authController.js)
   ↓
5. Factory (factories/make-register-use-case.js)
   ↓
6. Use Case (use-cases/register-use-case.js)
   ↓
7. Repository (repositories/sequelize/sequelize-users-repository.js)
   ↓
8. Database (MySQL via Sequelize)
   ↓
9. Response (formatado com HATEOAS)
```

## 🔄 Exemplo Completo: Registro de Usuário

### 1. Route

```javascript
// routes/authRoutes.js
router.post('/register', validate(registerSchema), register);
```

### 2. Controller

```javascript
// controllers/authController.js
export const register = async (req, res, next) => {
  try {
    const registerUseCase = makeRegisterUseCase();
    const { user, token } = await registerUseCase.execute(req.body);
    return res.status(201).json({ success: true, user, token });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).json({ success: false, message: error.message });
    }
    next(error);
  }
};
```

### 3. Use Case

```javascript
// use-cases/register-use-case.js
export class RegisterUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password }) {
    const userExists = await this.usersRepository.findByEmail(email);
    if (userExists) throw new UserAlreadyExistsError();

    const user = await this.usersRepository.create({ name, email, password });
    const token = generateToken(user.id);

    return { user: user.toSafeObject(), token };
  }
}
```

### 4. Repository

```javascript
// repositories/sequelize/sequelize-users-repository.js
export class SequelizeUsersRepository extends UsersRepository {
  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async create(data) {
    return await User.create(data);
  }
}
```

## 🎓 Princípios SOLID Aplicados

### **S - Single Responsibility Principle**

- Cada Use Case tem uma única responsabilidade
- Controllers apenas delegam para Use Cases
- Repositories apenas lidam com acesso a dados

### **O - Open/Closed Principle**

- Novas funcionalidades = novos Use Cases (não modificar existentes)
- Novos repositories podem ser adicionados sem modificar interfaces

### **L - Liskov Substitution Principle**

- Qualquer implementação de `UsersRepository` pode substituir outra
- `SequelizeUsersRepository` pode ser trocado por `PrismaUsersRepository`

### **I - Interface Segregation Principle**

- Repositories têm interfaces específicas e mínimas
- Cada Use Case depende apenas dos métodos que precisa

### **D - Dependency Inversion Principle**

- Use Cases dependem de abstrações (interfaces), não implementações
- Factories injetam dependências concretas

## 📝 Como Adicionar Novas Funcionalidades

### Exemplo: Adicionar "Forgot Password"

1. **Criar Custom Error**

```javascript
// use-cases/errors/user-not-found-error.js
export class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
    this.name = 'UserNotFoundError';
  }
}
```

2. **Criar Use Case**

```javascript
// use-cases/forgot-password-use-case.js
export class ForgotPasswordUseCase {
  constructor(usersRepository, emailService) {
    this.usersRepository = usersRepository;
    this.emailService = emailService;
  }

  async execute({ email }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new UserNotFoundError();

    const resetToken = generateResetToken();
    await this.usersRepository.update(user.id, { resetToken });
    await this.emailService.sendPasswordReset(email, resetToken);

    return { message: 'Password reset email sent' };
  }
}
```

3. **Criar Factory**

```javascript
// use-cases/factories/make-forgot-password-use-case.js
export function makeForgotPasswordUseCase() {
  const usersRepository = new SequelizeUsersRepository();
  const emailService = new EmailService();
  return new ForgotPasswordUseCase(usersRepository, emailService);
}
```

4. **Adicionar no Controller**

```javascript
// controllers/authController.js
export const forgotPassword = async (req, res, next) => {
  try {
    const forgotPasswordUseCase = makeForgotPasswordUseCase();
    const result = await forgotPasswordUseCase.execute(req.body);
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ success: false, message: error.message });
    }
    next(error);
  }
};
```

5. **Adicionar Rota**

```javascript
// routes/authRoutes.js
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
```

## 🧪 Testabilidade

A arquitetura facilita testes unitários:

```javascript
// __tests__/register-use-case.test.js
describe('RegisterUseCase', () => {
  it('should register a new user', async () => {
    // Mock repository
    const mockRepository = {
      findByEmail: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
    };

    const useCase = new RegisterUseCase(mockRepository);
    const result = await useCase.execute({
      name: 'Test',
      email: 'test@test.com',
      password: 'Test123!',
    });

    expect(result.user).toBeDefined();
    expect(result.token).toBeDefined();
  });

  it('should throw error if user exists', async () => {
    const mockRepository = {
      findByEmail: jest.fn().mockResolvedValue({ id: 1 }),
    };

    const useCase = new RegisterUseCase(mockRepository);

    await expect(useCase.execute({ email: 'existing@test.com' })).rejects.toThrow(UserAlreadyExistsError);
  });
});
```

## 📚 Comparação: Antes vs Depois

### ❌ Antes (Controller com tudo misturado)

```javascript
export const register = async (req, res) => {
  const { email, password } = req.body;

  // Lógica de negócio no controller
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({ error: 'User exists' });
  }

  const user = await User.create({ email, password });
  const token = generateToken(user.id);

  res.json({ user, token });
};
```

**Problemas:**

- ❌ Difícil de testar (precisa mockar req/res)
- ❌ Lógica de negócio acoplada ao Express
- ❌ Difícil reutilizar em outros contextos
- ❌ Acoplado ao Sequelize

### ✅ Depois (Clean Architecture)

```javascript
// Controller (apenas delegação)
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

// Use Case (lógica de negócio pura)
export class RegisterUseCase {
  async execute({ email, password }) {
    const userExists = await this.usersRepository.findByEmail(email);
    if (userExists) throw new UserAlreadyExistsError();

    const user = await this.usersRepository.create({ email, password });
    return { user, token: generateToken(user.id) };
  }
}
```

**Vantagens:**

- ✅ Fácil de testar (lógica pura)
- ✅ Desacoplado do Express
- ✅ Reutilizável (CLI, GraphQL, gRPC)
- ✅ Independente do ORM

## 🎯 Benefícios da Arquitetura

1. **Manutenibilidade**: Código organizado e fácil de entender
2. **Testabilidade**: Lógica de negócio isolada e testável
3. **Escalabilidade**: Fácil adicionar novas funcionalidades
4. **Flexibilidade**: Trocar implementações sem afetar lógica
5. **Reutilização**: Use Cases podem ser usados em diferentes contextos
6. **Separação de Responsabilidades**: Cada camada tem seu papel bem definido

---

**Referência:** Baseado nos padrões ensinados no projeto **GymSpot** (flag-88315-nodejs-main)
