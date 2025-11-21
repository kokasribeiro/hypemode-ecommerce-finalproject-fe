# 📚 Exemplos Práticos - Clean Architecture

## 🎯 Exemplos de Uso dos Use Cases

### 1. Registro de Usuário

```javascript
// ✅ Use Case (Lógica de Negócio Pura)
// use-cases/register-use-case.js
export class RegisterUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password, phone, address, city, postalCode, country }) {
    // Regra de negócio: Email deve ser único
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    // Criar usuário (password será hasheado pelo Sequelize hook)
    const user = await this.usersRepository.create({
      name,
      email,
      password,
      phone,
      address,
      city,
      postalCode,
      country,
    });

    // Gerar token JWT
    const token = generateToken(user.id);

    return {
      user: user.toSafeObject(), // Remove password do retorno
      token,
    };
  }
}
```

```javascript
// ✅ Factory (Dependency Injection)
// use-cases/factories/make-register-use-case.js
export function makeRegisterUseCase() {
  const usersRepository = new SequelizeUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);
  return registerUseCase;
}
```

```javascript
// ✅ Controller (HTTP Handling)
// controllers/authController.js
export const register = async (req, res, next) => {
  const { name, email, password, phone, address, city, postalCode, country } = req.body;

  try {
    // Delega para Use Case
    const registerUseCase = makeRegisterUseCase();
    const { user, token } = await registerUseCase.execute({
      name,
      email,
      password,
      phone,
      address,
      city,
      postalCode,
      country,
    });

    const userData = { user, token };

    const response = formatResponse(req, userData, 'auth', {
      additionalActions: {
        login: { path: 'login', method: 'POST', title: 'Login' },
        profile: { path: 'profile', method: 'GET', title: 'Get user profile' },
      },
    });

    return res.status(201).json({
      success: true,
      ...response,
    });
  } catch (error) {
    // Tratamento específico de erros do domínio
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }
    next(error); // Outros erros vão para o error handler global
  }
};
```

### 2. Autenticação (Login)

```javascript
// ✅ Use Case
// use-cases/authenticate-use-case.js
export class AuthenticateUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password, rememberMe = false }) {
    // Buscar usuário por email
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    // Verificar senha usando método do model
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    // Gerar token (30 dias se rememberMe, senão 7 dias)
    const token = generateToken(user.id, rememberMe);

    return {
      user: user.toSafeObject(),
      token,
    };
  }
}
```

```javascript
// ✅ Controller
// controllers/authController.js
export const login = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { user, token } = await authenticateUseCase.execute({
      email,
      password,
      rememberMe,
    });

    const userData = { user, token };

    const response = formatResponse(req, userData, 'auth', {
      additionalActions: {
        profile: { path: 'profile', method: 'GET', title: 'Get user profile' },
        logout: { path: 'logout', method: 'POST', title: 'Logout' },
      },
    });

    return res.status(200).json({
      success: true,
      ...response,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};
```

### 3. Buscar Produtos com Filtros

```javascript
// ✅ Use Case
// use-cases/get-products-use-case.js
export class GetProductsUseCase {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(filters = {}) {
    // Delega para o repository que conhece os detalhes do banco
    const result = await this.productsRepository.findAll(filters);
    return result;
  }
}
```

```javascript
// ✅ Repository (Implementação Sequelize)
// repositories/sequelize/sequelize-products-repository.js
export class SequelizeProductsRepository extends ProductsRepository {
  async findAll(filters = {}) {
    const {
      category,
      minPrice,
      maxPrice,
      featured,
      newArrival,
      bestSeller,
      discount,
      search,
      sort = 'createdAt',
      order = 'DESC',
      page = 1,
      limit = 12,
    } = filters;

    const where = { active: true };

    // Aplicar filtros
    if (category) where.category = category;

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }

    if (featured !== undefined) where.featured = featured;
    if (newArrival !== undefined) where.newArrival = newArrival;
    if (bestSeller !== undefined) where.bestSeller = bestSeller;
    if (discount !== undefined) where.discount = discount;

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    // Paginação
    const offset = (page - 1) * limit;

    // Executar query
    const { count, rows } = await Product.findAndCountAll({
      where,
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return {
      products: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
        limit: parseInt(limit),
      },
    };
  }
}
```

```javascript
// ✅ Controller
// controllers/productController.js
export const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      discount,
      featured,
      newArrival,
      bestSeller,
      page = 1,
      limit = 20,
      sort = '-createdAt',
    } = req.query;

    // Parse sort parameter
    let sortField = 'createdAt';
    let sortOrder = 'DESC';
    if (sort.startsWith('-')) {
      sortField = sort.substring(1);
      sortOrder = 'DESC';
    } else {
      sortField = sort;
      sortOrder = 'ASC';
    }

    // Usar Use Case
    const getProductsUseCase = makeGetProductsUseCase();
    const { products, pagination } = await getProductsUseCase.execute({
      category,
      search,
      minPrice,
      maxPrice,
      discount: discount === 'true' ? true : undefined,
      featured: featured === 'true' ? true : undefined,
      newArrival: newArrival === 'true' ? true : undefined,
      bestSeller: bestSeller === 'true' ? true : undefined,
      page,
      limit,
      sort: sortField,
      order: sortOrder,
    });

    const response = formatResponse(req, products, 'products', {
      page: pagination.page,
      totalPages: pagination.pages,
      limit: pagination.limit,
    });

    return res.status(200).json({
      success: true,
      count: pagination.total,
      totalPages: pagination.pages,
      currentPage: pagination.page,
      ...response,
    });
  } catch (error) {
    next(error);
  }
};
```

### 4. Buscar Produto por ID

```javascript
// ✅ Use Case
// use-cases/get-product-use-case.js
export class GetProductUseCase {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(id) {
    const product = await this.productsRepository.findById(id);

    // Regra de negócio: Produto deve existir
    if (!product) {
      throw new ResourceNotFoundError('Product');
    }

    return product;
  }
}
```

```javascript
// ✅ Controller
// controllers/productController.js
export const getProduct = async (req, res, next) => {
  try {
    const getProductUseCase = makeGetProductUseCase();
    const product = await getProductUseCase.execute(req.params.id);

    const response = formatResponse(req, product, 'products', {
      id: product.id,
      additionalActions: {
        addToCart: {
          path: 'cart',
          method: 'POST',
          title: 'Add to cart',
        },
      },
    });

    return res.status(200).json({
      success: true,
      ...response,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};
```

## 🧪 Exemplos de Testes

### Teste de Use Case (Unitário)

```javascript
// __tests__/use-cases/register-use-case.test.js
import { RegisterUseCase } from '../../use-cases/register-use-case';
import { UserAlreadyExistsError } from '../../use-cases/errors/user-already-exists-error';

describe('RegisterUseCase', () => {
  let mockUsersRepository;
  let registerUseCase;

  beforeEach(() => {
    // Mock do repository
    mockUsersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    registerUseCase = new RegisterUseCase(mockUsersRepository);
  });

  it('should register a new user successfully', async () => {
    // Arrange
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Test123!',
    };

    mockUsersRepository.findByEmail.mockResolvedValue(null); // Usuário não existe
    mockUsersRepository.create.mockResolvedValue({
      id: 1,
      ...userData,
      toSafeObject: () => ({ id: 1, name: userData.name, email: userData.email }),
    });

    // Act
    const result = await registerUseCase.execute(userData);

    // Assert
    expect(result.user).toBeDefined();
    expect(result.user.email).toBe(userData.email);
    expect(result.token).toBeDefined();
    expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(mockUsersRepository.create).toHaveBeenCalledWith(userData);
  });

  it('should throw UserAlreadyExistsError if email is already registered', async () => {
    // Arrange
    const userData = {
      name: 'John Doe',
      email: 'existing@example.com',
      password: 'Test123!',
    };

    mockUsersRepository.findByEmail.mockResolvedValue({ id: 1, email: userData.email });

    // Act & Assert
    await expect(registerUseCase.execute(userData)).rejects.toThrow(UserAlreadyExistsError);
    expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(mockUsersRepository.create).not.toHaveBeenCalled();
  });
});
```

### Teste de Repository (Integração)

```javascript
// __tests__/repositories/sequelize-users-repository.test.js
import { SequelizeUsersRepository } from '../../repositories/sequelize/sequelize-users-repository';
import { User } from '../../models';

describe('SequelizeUsersRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new SequelizeUsersRepository();
  });

  afterEach(async () => {
    // Limpar banco de testes
    await User.destroy({ where: {}, truncate: true });
  });

  it('should create a new user', async () => {
    // Arrange
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Test123!',
    };

    // Act
    const user = await repository.create(userData);

    // Assert
    expect(user.id).toBeDefined();
    expect(user.email).toBe(userData.email);
    expect(user.password).not.toBe(userData.password); // Password deve estar hasheado
  });

  it('should find user by email', async () => {
    // Arrange
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Test123!',
    };
    await repository.create(userData);

    // Act
    const user = await repository.findByEmail(userData.email);

    // Assert
    expect(user).toBeDefined();
    expect(user.email).toBe(userData.email);
  });

  it('should return null if user not found', async () => {
    // Act
    const user = await repository.findByEmail('nonexistent@example.com');

    // Assert
    expect(user).toBeNull();
  });
});
```

### Teste de Controller (E2E)

```javascript
// __tests__/controllers/auth.test.js
import request from 'supertest';
import app from '../../server';
import { User } from '../../models';

describe('Auth Controller', () => {
  afterEach(async () => {
    await User.destroy({ where: {}, truncate: true });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      // Arrange
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test123!',
      };

      // Act
      const response = await request(app).post('/api/auth/register').send(userData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.token).toBeDefined();
    });

    it('should return 409 if user already exists', async () => {
      // Arrange
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test123!',
      };
      await User.create(userData);

      // Act
      const response = await request(app).post('/api/auth/register').send(userData);

      // Assert
      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      // Arrange
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test123!',
      };
      await User.create(userData);

      // Act
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: userData.email, password: userData.password });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
    });

    it('should return 401 with invalid credentials', async () => {
      // Act
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'wrong@example.com', password: 'wrong' });

      // Assert
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
```

## 🔄 Como Adicionar Nova Funcionalidade

### Exemplo: Adicionar "Forgot Password"

#### 1. Criar Custom Error

```javascript
// use-cases/errors/user-not-found-error.js
export class UserNotFoundError extends Error {
  constructor() {
    super('User not found with this email');
    this.name = 'UserNotFoundError';
  }
}
```

#### 2. Adicionar método no Repository

```javascript
// repositories/users-repository.js
export class UsersRepository {
  // ... métodos existentes

  async updateResetToken(email, token, expiresAt) {
    throw new Error('Method updateResetToken() must be implemented');
  }
}
```

```javascript
// repositories/sequelize/sequelize-users-repository.js
export class SequelizeUsersRepository extends UsersRepository {
  // ... métodos existentes

  async updateResetToken(email, token, expiresAt) {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    await user.update({
      resetPasswordToken: token,
      resetPasswordExpires: expiresAt,
    });

    return user;
  }
}
```

#### 3. Criar Use Case

```javascript
// use-cases/forgot-password-use-case.js
import crypto from 'crypto';
import { UserNotFoundError } from './errors/user-not-found-error.js';

export class ForgotPasswordUseCase {
  constructor(usersRepository, emailService) {
    this.usersRepository = usersRepository;
    this.emailService = emailService;
  }

  async execute({ email }) {
    // Verificar se usuário existe
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }

    // Gerar token de reset
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hora

    // Salvar token no banco
    await this.usersRepository.updateResetToken(email, hashedToken, expiresAt);

    // Enviar email
    await this.emailService.sendPasswordResetEmail(email, resetToken);

    return {
      message: 'Password reset email sent successfully',
    };
  }
}
```

#### 4. Criar Factory

```javascript
// use-cases/factories/make-forgot-password-use-case.js
import { SequelizeUsersRepository } from '../../repositories/sequelize/sequelize-users-repository.js';
import { EmailService } from '../../services/email-service.js';
import { ForgotPasswordUseCase } from '../forgot-password-use-case.js';

export function makeForgotPasswordUseCase() {
  const usersRepository = new SequelizeUsersRepository();
  const emailService = new EmailService();
  const forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository, emailService);

  return forgotPasswordUseCase;
}
```

#### 5. Adicionar Controller

```javascript
// controllers/authController.js
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const forgotPasswordUseCase = makeForgotPasswordUseCase();
    const result = await forgotPasswordUseCase.execute({ email });

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      // Por segurança, não revelar se o email existe
      return res.status(200).json({
        success: true,
        message: 'If the email exists, a password reset link will be sent',
      });
    }
    next(error);
  }
};
```

#### 6. Adicionar Rota

```javascript
// routes/authRoutes.js
import { forgotPassword } from '../controllers/authController.js';
import { validate } from '../middleware/validation.js';
import { forgotPasswordSchema } from '../schemas/validationSchemas.js';

router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
```

#### 7. Adicionar Schema de Validação

```javascript
// schemas/validationSchemas.js
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
});
```

## 🎯 Resumo dos Benefícios

### ✅ Testabilidade
- Use Cases testáveis sem dependências externas
- Repositories facilmente mockáveis
- Controllers testáveis com supertest

### ✅ Manutenibilidade
- Cada camada tem responsabilidade clara
- Mudanças isoladas não afetam outras camadas
- Código organizado e fácil de navegar

### ✅ Reutilização
- Use Cases podem ser usados em diferentes contextos:
  - REST API
  - GraphQL
  - CLI commands
  - Background jobs
  - WebSockets

### ✅ Flexibilidade
- Fácil trocar implementações (Sequelize → Prisma)
- Fácil adicionar novas features
- Fácil adicionar novos canais de comunicação

---

**Referência:** Baseado no projeto **GymSpot** (flag-88315-nodejs-main/9-gymspot)

