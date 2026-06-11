# Sistema de Cadastro e Autenticação

## Descrição
Aplicação web de cadastro e autenticação de usuários desenvolvida com React (frontend) e Express + SQLite (backend), utilizando validação rigorosa em ambas as camadas.

## Tecnologias Utilizadas

### Frontend
- **React 19.2.6** - Biblioteca para criar interfaces
- **Vite 8.0.12** - Build tool e dev server
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP para requisições
- **Zod** - Validação de dados

### Backend
- **Express 5.2.1** - Framework web
- **SQLite3** - Banco de dados
- **bcryptjs** - Hash de senhas
- **CORS** - Compartilhamento de recursos entre origens

## Requisitos
- Node.js (v14+)
- npm ou yarn

## Instalação

### 1. Instalar dependências do backend
```bash
cd c:\Users\labins.pmw\Projeto_formulario
npm install
```

### 2. Instalar dependências do frontend
```bash
cd Projeto_form
npm install
```

## Execução

### Backend (em um terminal)
```bash
npm start
# ou
npm run dev
```
O servidor rodará na porta 3001: `http://localhost:3001`

### Frontend (em outro terminal)
```bash
cd Projeto_form
npm run dev
```
A aplicação será aberta em `http://localhost:5173` (ou outra porta disponível)

## Funcionalidades

### ✅ Cadastro de Usuário
- **Validação de campos obrigatórios** (Nome, Email, Senha, Confirmação de Senha)
- **Validação no frontend** com React Hook Form
- **Validação no backend** com regras rigorosas
- **Verificação de email único** no banco de dados
- **Hash de senha** com bcryptjs
- **Mensagens de erro descritivas** para o usuário

### ✅ Login de Usuário
- **Autenticação** com email e senha
- **Comparação segura** de senhas com bcrypt
- **Mensagens de sucesso/erro** claras
- **Dados do usuário retornados** após login bem-sucedido

### ✅ Tratamento de Erros
- **Validação frontend** - Feedback imediato ao usuário
- **Validação backend** - Segurança adicional
- **Tratamento de exceções** - Blocos try-catch em requisições HTTP
- **Mensagens de erro específicas** para cada tipo de falha
- **Tratamento de falhas de conexão** com o servidor

## Estrutura do Projeto

```
Projeto_formulario/
├── server.js                 # Servidor Express principal
├── database.js              # Inicialização do SQLite
├── users.db                 # Banco de dados (criado automaticamente)
├── routes/
│   └── auth.js              # Rotas de cadastro e login
├── Projeto_form/            # Frontend (Vite + React)
│   ├── src/
│   │   ├── App.jsx          # Componente principal
│   │   ├── App.css          # Estilos da app
│   │   ├── components/
│   │   │   ├── RegisterForm.jsx    # Formulário de cadastro
│   │   │   └── LoginForm.jsx       # Formulário de login
│   │   └── styles/
│   │       ├── RegisterForm.css    # Estilos do cadastro
│   │       └── LoginForm.css       # Estilos do login
│   └── package.json         # Dependências do frontend
└── package.json             # Dependências do backend
```

## Endpoints da API

### POST `/api/auth/register`
Cadastro de novo usuário

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "confirmPassword": "senha123"
}
```

**Response (sucesso - 201):**
```json
{
  "success": true,
  "message": "Cadastro realizado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com"
  }
}
```

**Response (erro):**
```json
{
  "success": false,
  "message": "Descrição do erro"
}
```

### POST `/api/auth/login`
Autenticação do usuário

**Request:**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Response (sucesso - 200):**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com"
  }
}
```

## Regras de Validação

### Frontend
- **Nome**: Mínimo 3 caracteres, obrigatório
- **Email**: Formato válido, obrigatório
- **Senha**: Mínimo 6 caracteres, obrigatória
- **Confirmação**: Deve coincidir com a senha, obrigatória

### Backend
- **Nome**: Mínimo 3 caracteres, obrigatório
- **Email**: Formato válido, único, obrigatório
- **Senha**: Mínimo 6 caracteres, obrigatória
- **Confirmação**: Deve coincidir com a senha, obrigatória

## Tratamento de Erros

### Frontend (Axios)
```javascript
try {
  const response = await axios.post(url, data);
  // Sucesso
} catch (error) {
  if (error.response) {
    // Erro do servidor (4xx, 5xx)
    message = error.response.data.message;
  } else if (error.request) {
    // Sem resposta do servidor
    message = 'Erro de conexão';
  } else {
    // Erro na requisição
    message = 'Erro: ' + error.message;
  }
}
```

### Backend (Express)
- Validação de dados de entrada
- Mensagens de erro específicas por tipo de falha
- HTTP status codes apropriados
- Middleware de tratamento de erros global

## Segurança

- ✅ Hashing de senhas com bcryptjs (10 rounds)
- ✅ Emails únicos no banco de dados
- ✅ Validação rigorosa frontend e backend
- ✅ CORS configurado para o frontend
- ✅ Tratamento seguro de erros
- ✅ Sem exposição de dados sensíveis nas respostas de erro

## Desenvolvimento

### Debug
- Logs no servidor para debug
- Mensagens de erro descritivas
- Console do navegador para debugar frontend

### Próximas melhorias possíveis
- Implementar JWT para autenticação stateless
- Adicionar reset de senha
- Implementar validação de email (verificação de link)
- Adicionar dashboard de usuário
- Implementar refresh tokens
- Adicionar proteção contra CSRF
- Rate limiting em endpoints sensíveis

## Licença
ISC
