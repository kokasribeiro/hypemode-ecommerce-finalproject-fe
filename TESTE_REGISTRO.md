# 🧪 Guia de Teste - Registro de Utilizadores

## ✅ Username - Totalmente Livre!

O **username aceita QUALQUER caractere**:

✅ Letras minúsculas: `joao`, `maria`  
✅ Letras maiúsculas: `JOAO`, `MARIA`  
✅ Números: `user123`, `maria2024`  
✅ Caracteres especiais: `joão@123`, `maria_silva!`, `user#2024`  
✅ Emojis: `user😀`, `maria🎉`  
✅ Espaços: `João Silva`  
✅ Qualquer combinação: `JoÃo_SiLv@123!`

**Sem restrições!** Use o que quiser! 🎉

---

## 🔐 Requisitos da Senha (Para Segurança)

A senha TEM requisitos obrigatórios:

### **Requisitos:**

1. ✅ **Mínimo 8 caracteres**
2. ✅ **1 letra MAIÚSCULA** (A-Z)
3. ✅ **1 caractere especial** (!@#\$%^&\*()\_+-=[]{};"':|,.<>/?)

### **Exemplos de Senhas Válidas:**

✅ `MyPassword@123`  
✅ `Senha@123`  
✅ `JoaoSilva!2024`  
✅ `Maria#Password`  
✅ `Test@1234`  
✅ `Admin123!`

### **Exemplos de Senhas Inválidas:**

❌ `password` - Sem maiúscula e sem especial  
❌ `password123` - Sem maiúscula e sem especial  
❌ `Password` - Sem caractere especial  
❌ `Pass@1` - Menos de 8 caracteres

---

## 🧪 Teste Agora - Dados de Exemplo

Use estes dados para testar o registro:

### **Exemplo 1: Simples**

```
First Name: João
Last Name: Silva
Date of Birth: 1990-01-15
Email: joao@example.com
Username: joao_silva (ou qualquer coisa!)
Password: MyPassword@123
Confirm Password: MyPassword@123
```

### **Exemplo 2: Com Caracteres Especiais no Username**

```
First Name: Maria
Last Name: Santos
Date of Birth: 1995-05-20
Email: maria@example.com
Username: maria@santos#2024!
Password: Senha@123
Confirm Password: Senha@123
```

### **Exemplo 3: Com Números no Username**

```
First Name: Pedro
Last Name: Costa
Date of Birth: 1988-12-10
Email: pedro@example.com
Username: pedro123
Password: Test@1234
Confirm Password: Test@1234
```

---

## 🔍 Ver Erros no Console

**Abra o DevTools (F12)** antes de tentar registar.

Quando clicar em "CREATE ACCOUNT", você verá no console:

### **Se tiver erros de validação:**

```
❌ Validation errors: {
  password: "Password must contain at least one uppercase letter"
}
```

### **Se houver erro do backend:**

```
❌ Registration error full: {
  message: "User already exists with this email"
}
```

### **Se funcionar:**

```
🚀 Attempting registration with data: {
  name: "João Silva",
  email: "joao@example.com",
  username: "joao_silva"
}
✅ Registration successful: {
  id: 3,
  name: "João Silva",
  email: "joao@example.com"
}
```

---

## 🚨 Erros Comuns e Soluções

### **Erro: "Password must contain at least one uppercase letter"**

**Problema:** Senha sem letra maiúscula

**Solução:** Use uma senha como `MyPassword@123`

---

### **Erro: "Password must contain at least one special character"**

**Problema:** Senha sem caractere especial

**Solução:** Adicione `!@#$%^&*` à senha. Ex: `Mypassword@123`

---

### **Erro: "Password must be at least 8 characters long"**

**Problema:** Senha muito curta

**Solução:** Use no mínimo 8 caracteres. Ex: `Test@1234`

---

### **Erro: "Passwords do not match"**

**Problema:** Password e Confirm Password diferentes

**Solução:** Digite a mesma senha nos dois campos

---

### **Erro: "This email is already registered"**

**Problema:** Email já existe no banco

**Solução:** Use outro email ou faça login com este

---

### **Erro: "You must be at least 16 years old"**

**Problema:** Data de nascimento indica menos de 16 anos

**Solução:** Use uma data que resulte em 16+ anos

---

## ✅ Checklist Antes de Registar

Antes de clicar "CREATE ACCOUNT", verifique:

- [ ] First Name preenchido
- [ ] Last Name preenchido
- [ ] Date of Birth preenchido (16+ anos)
- [ ] Email válido (formato: nome@dominio.com)
- [ ] Username preenchido (**aceita QUALQUER caractere!**)
- [ ] Password com:
  - [ ] Mínimo 8 caracteres
  - [ ] 1 letra MAIÚSCULA
  - [ ] 1 caractere especial (!@#\$%^&\*)
- [ ] Confirm Password igual ao Password

---

## 🎯 Senha de Teste Rápida

Use esta senha para teste rápido:

```
Password: Test@1234
```

✅ 8 caracteres  
✅ Tem maiúscula (T)  
✅ Tem especial (@)  
✅ Fácil de lembrar

---

## 📊 Verificar se Funcionou

### **No Console do Navegador:**

```javascript
// Ver se está logado
console.log('Token:', localStorage.getItem('token'));
console.log('User:', localStorage.getItem('user'));
```

### **No MySQL:**

```bash
mysql -u root -p
USE hypemode_ecommerce;

# Ver todos os utilizadores
SELECT id, name, email, role FROM users;

# Ver o utilizador que acabou de criar
SELECT * FROM users WHERE email = 'seu_email@example.com';
```

---

## 🎉 Se Funcionar

Você verá:

- ✅ Mensagem de sucesso
- ✅ Redirecionamento automático
- ✅ Utilizador logado
- ✅ Dados salvos no MySQL

---

## 📝 Resumo

**Username:**

- ✅ **Totalmente livre** - Use qualquer caractere!
- ✅ Letras, números, especiais, emojis - TUDO permitido!

**Password:**

- ⚠️ Requisitos de segurança (mínimo 8 chars, 1 maiúscula, 1 especial)
- 💡 Use: `Test@1234` para teste rápido

**Email:**

- ⚠️ Deve ser único (não pode existir outro utilizador com mesmo email)
- 💡 Use um email diferente a cada teste

---

## 🚀 Teste Agora!

1. Acesse: `http://localhost:5173/register`
2. Use os dados de exemplo acima
3. Abra o Console (F12) para ver os logs
4. Clique "CREATE ACCOUNT"
5. Veja os logs para entender o que aconteceu

**Me diga o que aparece no console se ainda der erro!** 🔍
