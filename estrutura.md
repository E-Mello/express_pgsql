# Plano de Atividades - API CRUD (Express + PostgreSQL)

> **Visão Geral**  
> Esta documentação descreve as atividades necessárias para construir e integrar uma API CRUD usando Express e PostgreSQL, separada por pastas e com foco na integração frontend.

---

## Estrutura de Pastas

```
project-root/
├── config/
├── schemas/
├── services/
├── routes/
└── server.js
```

---

## Atividades por Pasta

### 📁 config/
- Criar `config/db.js`.
- Configurar Pool do `pg` usando variáveis de ambiente no `.env`.
- Implementar tratamento de erros de conexão.

### 📁 schemas/
- Criar `schemas/itemSchema.js`.
- Definir validações Zod para **createItemSchema** e **updateItemSchema** (parcial).
- Tratar erros de validação e retornar respostas 400.

### 📁 services/
- Criar `services/itemService.js`.
- Implementar funções de CRUD:
  - `createItem`
  - `getAllItems`
  - `getItemById`
  - `updateItem`
  - `deleteItem`
- Utilizar SQL parametrizado (prepared statements).
- Tratar erros de banco e garantir respostas adequadas.

### 📁 routes/
- Criar `routes/itemRoutes.js`.
- Definir rotas RESTful:
  - `POST /api/items`
  - `GET /api/items`
  - `GET /api/items/:id`
  - `PUT /api/items/:id`
  - `PATCH /api/items/:id`
  - `DELETE /api/items/:id`
- Integrar validação Zod nos endpoints.
- Tratar erros e enviar status HTTP apropriado.

### 📁 Root
- Criar `server.js`.
- Inicializar Express.
- Montar rotas em `/api`.
- Implementar handler 404 para rotas não encontradas.
- Logar startup do servidor na porta configurada.

---

## Integração com Frontend (React + Vite)
- Inicializar projeto React com Vite.
- Desenvolver componente de listagem de itens (**GET /api/items**).
- Implementar componente de criação de item (**POST /api/items**).
- Desenvolver edição de item (**PUT/PATCH /api/items/:id**).
- Implementar exclusão de item (**DELETE /api/items/:id**).
- Gerenciar estado (loading, erros).
- Estilizar interface de forma responsiva com Tailwind ou CSS Modules.

---

## Fluxo Simplificado

```text
[Frontend React + Vite] → [API Express] → [PostgreSQL]
```
