# Viceri-SEIDOR Challenge

[[Docs](README.md) | [Challenge](README.pt.md)]

## Description

Desafio Backend desenvolvido utilizando Typescript, NodeJS, Express and SQLITE.

### My journey

Implementei uma API REST para um aplicativo To-do List. Pensei em uma abordagem usando UseCases, Controller e Repository. Concentrei as regas de negócio nos UseCases, já os Controllers são responsáveis cuidar das requisições HTTP e os Repository tem a responsabilidade de persistir e recuperar os dados.

### Improvments

- Implementar mais testes.
- Aumentar o alcance das validações às rotas.

## Configuração do projeto

Disponibilizei um arquivo .env.example que contém as variáveis de ambientes necessário para o funcionamento da aplicação.

Para rodar a aplicação em desenvolvimento você pode utilizar o comando:

- `yarn dev`

Se tudo ocorrer bem o servidor está rodando na seguinte URL:

- `localhost:3000`.

Também disponibilizei uma inicialização para ambiente de produção.

Para buildar a aplicação em produção você pode utilizar o comando:

- `yarn build`

Em seguida execute o comando:

- `yarn start`

Se tudo ocorrer bem o servidor está rodando na seguinte URL:

- `localhost:3000`.

## 🚀 Tecnologias

- TypeScript
- Swagger
- SQLITE
- NodeJS
- Yarn
- TypeORM
- Express
- Jest

# Endpoints

## **Documentação Swagger**

- **URL:** <br>
  /api-docs

---

## **Create User**

Cria um usuário no banco de dados utilizando o conteúdo do payload.

- **URL**

  /users/create

- **Method:**

  `POST`

- **Data Params**

  ```json
  {
    "name": "John Doe",
    "email": "johndoe@email.com",
    "password": "password123"
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**

```json
{
  "token": "jwt-token",
  "user": {
    "name": "John Doe",
    "email": "johndoe@email.com"
  }
}
```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message" : "User already exists!" }`

---

## **User Login**

- **URL**

  /users/login

- **Method:**

  `POST`

- **Data Params**

  ```json
  {
    "email": "johndoe@email.com",
    "password": "password123"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

```json
{
  "token": "jwt-token",
  "user": {
    "name": "John Doe",
    "email": "johndoe@email.com"
  }
}
```

- **Error Response:**

  - **Code:** 401 Unauthorized <br />
    **Content:** `{ "message" : "Email or password incorrect!" }`

---

## **Delete User**

Delete User.

- **URL**

  /users

- **Method:**

  `DELETE`

- **AUTH BEARER TOKEN**

  **Required:**

  `token=[jwt]`

- **Success Response:**

  - **Code:** 200 <br />

---

## **Update User**

Convert currency amount.

- **URL**

  /users/update

- **Method:**

  `PUT`

- **BODY Params**

  **Required:**

- **Data Params**

  ```json
  {
    "email": "johndoe@email.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- **AUTH BEARER TOKEN**

  **Required:**

  `token=[jwt]`

- **Success Response:**

  - **Code:** 204 NO CONTENT<br />

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": ""Unauthorized email manipulation!" }`

---

## **Create Task**

Cria um usuário no banco de dados utilizando o conteúdo do payload.

- **URL**

  /tasks/create

- **Method:**

  `POST`

- **Data Params**

```json
{
  "description": "Corrida matinal",
  "priority": "high"
}
```

- **AUTH BEARER TOKEN**

  **Required:**

  `token=[jwt]`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**

```json
{
  "id": "uuid",
  "status": "pending",
  "description": "Corrida matinal",
  "priority": "high",
  "user": {
    "id": "uuid"
  },
  "created_at": "date timestamp"
}
```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message" : "Invalid priority option! Choose: high, medium, low" }`

---

## **List all Task**

Lista as tarefas(to-do) com base na query param.

- **URL**

  /tasks/?status=['STATUS'] <br>
  status = pending or done <br>

- ##### Se nenhum status for passado retorna todas as tasks.

- **Method:**

  `POST`

- **QUERY Params**

  **Required:**

  `status=[done] or [pending]`

- **AUTH BEARER TOKEN**

  **Required:**

  `token=[jwt]`

- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**

```json
{[
  "id": "uuid",
  "status": "pending",
  "description": "Corrida matinal",
  "priority": "high",
  "user": {
    "id": "uuid"
  },
  "created_at": "date timestamp"
]
}
```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message" : "Invalid option! Choose: Done or Pending" }`

---

## **Update Task**

Atuliza uma task com as informações fornecidas no corpo da requisição.

- **URL**

  /tasks/update/taskId <br>

- **Method:**

  `PATCH`

- **Data Params**

```json
{
  "description": "description update",
  "status": "DONE",
  "priority": "high"
}
```

- **AUTH BEARER TOKEN**

  **Required:**

  `token=[jwt]`

- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**

```json
{
  "id": "uuid",
  "status": "done",
  "description": "description update",
  "priority": "high",
  "created_at": "date timestamp"
}
```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message" : "Task doesn't exists!" }`

---

## **Delete Task**

Deleta uma tarefa(TO-DO).

- **URL**

  /users/delete/:taskId

- **Method:**

  `DELETE`

- **AUTH BEARER TOKEN**

  **Required:**

  `token=[jwt]`

- **Success Response:**

  - **Code:** 200 <br />

---
