# Guia de Início

Este projeto agora está organizado em duas pastas principais:

- `front_end/` — frontend React com Vite
- `back_end/` — backend Node.js com Express e SQLite

## Como preparar o projeto

1. Abra o terminal no diretório raiz do projeto:
   ```bash
   cd c:\Users\savio\Projeto_Formulario
   ```

2. Instale as dependências do backend:
   ```bash
   cd back_end
   npm install
   ```

3. Instale as dependências do frontend:
   ```bash
   cd ..\front_end
   npm install
   ```

## Como rodar o backend

No terminal do `back_end`:

```bash
npm start
```

Isso inicia o servidor Express em `http://localhost:3001`.

## Como rodar o frontend

No terminal do `front_end`:

```bash
npm run dev
```

O Vite abrirá a aplicação em `http://localhost:5173` ou outra porta disponível.

## Como usar frontend e backend juntos

- O frontend faz requisições para a API do backend em `http://localhost:3001`.
- Se necessário, configure o proxy no arquivo `front_end/vite.config.js` para facilitar o desenvolvimento.

## Comandos úteis no diretório raiz

```bash
npm run backend:start
npm run backend:dev
npm run frontend:dev
```

## Estrutura recomendada para um projeto profissional

- `front_end/` — todo o código de interface do usuário
- `back_end/` — lógica do servidor, rotas e banco de dados
- Separar claramente dependências de frontend e backend
- Manter documentação de instalação no `README.md`
