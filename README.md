# Projeto Formular

## Estrutura do projeto

O projeto foi reorganizado em duas pastas principais:

- `front_end/` — aplicação React + Vite
- `back_end/` — servidor Node.js + Express + SQLite

Também foram adicionados guias de apoio:
- `Guia_Inicio.md` — como usar e rodar o frontend junto com o backend
- `GUiA_estudos.md` — material de apoio para estudo

## Executando o projeto

### 1. Instalar dependências
```bash
cd c:\Users\savio\Projeto_Formulario\back_end
npm install

cd c:\Users\savio\Projeto_Formulario\front_end
npm install
```

### 2. Rodar o backend
```bash
cd c:\Users\savio\Projeto_Formulario\back_end
npm start
```

### 3. Rodar o frontend
```bash
cd c:\Users\savio\Projeto_Formulario\front_end
npm run dev
```

## Comandos úteis no root

No diretório raiz você também pode executar scripts de forma direcionada:

```bash
cd c:\Users\savio\Projeto_Formulario
npm run backend:start
npm run backend:dev
npm run frontend:dev
```

## Backend

- Pasta: `back_end/`
- Servidor: `back_end/server.js`
- Banco de dados: `back_end/users.db` (criado automaticamente)
- Rotas: `back_end/routes/auth.js`
- Dependências: `express`, `cors`, `sqlite3`, `bcryptjs`

## Frontend

- Pasta: `front_end/`
- Aplicação React com Vite
- Componentes principais em `front_end/src/`
- Formulários em `front_end/src/components/`
- Estilos em `front_end/src/styles/`

## Estrutura final do projeto

```
Projeto_Formulario/
├── back_end/
│   ├── database.js
│   ├── package.json
│   ├── package-lock.json
│   ├── routes/
│   │   └── auth.js
│   └── server.js
├── front_end/
│   └── [arquivos do frontend existentes]
├── Guia_Inicio.md
├── GUiA_estudos.md
└── README.md
```

## Endpoints principais

- `POST /api/auth/register` — cadastrar novo usuário
- `POST /api/auth/login` — autenticar usuário

## Dicas para tornar o projeto mais profissional

- Separe frontend e backend em pastas distintas
- Use `npm install` separadamente em cada pasta
- Faça validação no frontend e no backend
- Use mensagens claras de erro e sucesso
- Documente os comandos e a estrutura do projeto

## Observação

O backend roda na porta `3001` e o frontend roda no Vite em uma porta separada, normalmente `5173`.
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
