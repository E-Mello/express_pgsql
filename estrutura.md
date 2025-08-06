# Plano de Atividades - API CRUD (Express + PostgreSQL)

> **Visão Geral**  
> Esta documentação descreve as atividades necessárias para construir, documentar e integrar uma API CRUD usando Express e PostgreSQL, separada por pastas e com foco na integração frontend e na documentação interativa via Swagger UI.

---

## Estrutura de Pastas

```text
project-root/
├── config/
├── schemas/
├── services/
├── routes/
├── server.js
└── docs/
```

---

## Atividades por Pasta

### 📁 config/

- Criar `config/db.js`
- Configurar Pool do `pg` usando variáveis de ambiente no `.env`
- Implementar tratamento de erros de conexão
- **Nova**: Criar `config/swagger.js` com definição OpenAPI (title, version, servers, apis)

### 📁 schemas/

- Criar `schemas/itemSchema.js`
- Definir validações Zod para **createItemSchema** e **updateItemSchema** (parcial)
- Tratar erros de validação e retornar respostas HTTP adequadas

### 📁 services/

- Criar `services/itemService.js`
- Implementar funções de CRUD:
  - `createItem`
  - `getAllItems`
  - `getItemById`
  - `updateItem`
  - `deleteItem`
- Utilizar SQL parametrizado (prepared statements)
- Tratar erros de banco e garantir respostas adequadas

### 📁 routes/

- Criar `routes/itemRoutes.js`
- Definir rotas RESTful:
  - `POST   /api/items`
  - `GET    /api/items`
  - `GET    /api/items/:id`
  - `PUT    /api/items/:id`
  - `PATCH  /api/items/:id`
  - `DELETE /api/items/:id`
- Integrar validação Zod nos endpoints
- Anotar cada rota com comentários JSDoc/OpenAPI para gerar o spec

### 📁 Root

- Criar `server.js`
- Inicializar Express
- Montar middleware `express.json()`
- Montar todas as rotas em `/api`
- Adicionar handler 404 para rotas não encontradas
- **Nova**: Servir Swagger UI em `/api/docs`

---

## Documentação Interativa (Swagger UI)

- **Instalação**:
  ```bash
  npm install swagger-ui-express swagger-jsdoc
  ```
- **Configuração**:
  1. Em `config/swagger.js`, definir objeto OpenAPI (info, servers, apis).
  2. Indicar `apis: ['./routes/*.js']` para ler os comentários JSDoc.
- **Anotações JSDoc**:
  - Em cada rota de `routes/itemRoutes.js`, adicionar blocos `@openapi` com parâmetros, requestBody e respostas.
- **Montagem no Express**:
  - Em `server.js`, importar `swaggerSpec` e usar:
    ```js
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    ```
- **Teste**:
  - Acessar `http://localhost:<PORT>/api/docs` e validar a interface.
- **Opcional**:
  - Customizar tema, logo ou título usando opções do `swaggerUi.setup()`.

---

## Integração com Frontend (React + Vite)

- Inicializar projeto React com Vite
- Desenvolver componente de listagem de itens (**GET /api/items**)
- Implementar componente de criação de item (**POST /api/items**)
- Desenvolver edição de item (**PUT/PATCH /api/items/:id**)
- Implementar exclusão de item (**DELETE /api/items/:id**)
- Gerenciar estado (loading, erros)
- Estilizar interface de forma responsiva (Tailwind, CSS Modules, etc.)

---

## Fluxo Simplificado

```text
[Frontend React + Vite] → [API Express] → [PostgreSQL]
```
