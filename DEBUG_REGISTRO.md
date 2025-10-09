# 🐛 Debug - Registro de Utilizadores

## ✅ Backend Funcionando

O backend está funcionando perfeitamente:

- ✅ API: `http://localhost:3000/api/auth/register`
- ✅ Status: 201 Created
- ✅ Response: `{"success":true,"data":{"user":{...},"token":"..."}}`

---

## 🔍 Teste no Frontend

### **1. Abra o Console (F12)**

Antes de tentar registar, abra o DevTools (F12) para ver os logs.

### **2. Vá para o Registro**

Acesse: `http://localhost:5173/register`

### **3. Preencha o Formulário**

Use estes dados de teste:

```
First Name: Nelson
Last Name: Ribeiro
Date of Birth: 10/08/1993
Email: nelson@teste.com (use um email diferente!)
Username: nelson123
Password: Test@1234
Confirm Password: Test@1234
```

### **4. Clique "CREATE ACCOUNT"**

### **5. Veja o Console**

Deve aparecer algo como:

```
🚀 API Service - Register attempt: { name: "Nelson Ribeiro", email: "nelson@teste.com", ... }
📡 API Service - Register response: { success: true, data: { user: {...}, token: "..." } }
🔍 Full response object: { success: true, data: { user: {...}, token: "..." } }
🔍 Response success: true
🔍 Response data: { user: {...}, token: "..." }
✅ Registration successful: { id: 8, name: "Nelson Ribeiro", email: "nelson@teste.com" }
```

---

## 🚨 Se Der Erro

### **Erro de Validação:**

```
❌ Validation errors: {
  password: "Password must contain at least one uppercase letter"
}
```

**Solução:** Use uma senha como `Test@1234`

### **Erro de Email Duplicado:**

```
❌ Registration error full: {
  message: "User already exists with this email"
}
```

**Solução:** Use outro email como `nelson2@teste.com`

### **Erro de Rede:**

```
❌ API Error: Network Error
```

**Solução:** Verifique se o backend está rodando em `http://localhost:3000`

### **Erro de CORS:**

```
❌ API Error: CORS error
```

**Solução:** O backend já tem CORS configurado, deve funcionar

---

## 🧪 Teste Rápido

### **Dados que Funcionam:**

```
First Name: João
Last Name: Silva
Date of Birth: 1990-01-15
Email: joao@teste.com
Username: joao123
Password: Test@1234
Confirm Password: Test@1234
```

### **Senha de Teste:**

```
Password: Test@1234
```

✅ 8 caracteres  
✅ Tem maiúscula (T)  
✅ Tem especial (@)  
✅ Fácil de lembrar

---

## 🔧 Se Ainda Não Funcionar

### **1. Verifique o Backend:**

```bash
curl http://localhost:3000/api/products
```

Deve retornar uma lista de produtos.

### **2. Verifique o Frontend:**

```bash
curl http://localhost:5173
```

Deve retornar HTML da página.

### **3. Verifique os Logs:**

- **Backend:** Terminal onde rodou `npm run dev` no backend
- **Frontend:** Console do navegador (F12)

---

## 📝 Me Diga

**Cole aqui exatamente o que aparece no console quando tenta registar!**

Exemplo:

```
🚀 API Service - Register attempt: { ... }
📡 API Service - Register response: { ... }
❌ Registration error full: { ... }
```

**Com essas informações, posso resolver o problema!** 🔍
