# Safe Routes Project

## Endpoints (For Frontend Usage)

- Base URL: `https://saferoutes-4-12.herokuapp.com`

| Endpoint                    | Description               |
| --------------------------- | ------------------------- |
| POST `/api/auth/register`   | Registers User            |
| POST `/api/auth/login`      | Logs in User              |
| PUT `/api/user/:id`         | Updates Username          |
| DELETE `/api/user/:id`      | Deletes User              |
| POST `/api/addresses/:id`   | Saves an address for User |
| GET `/api/addresses/:id`    | Gets User's addresses     |
| DELETE `/api/addresses/:id` | Deletes User's address    |

All endpoints have descriptive error messages.

---

#### POST `/api/auth/register`

Send in body:

```json
{
  "email": "test@gmail.com",
  "name": "Testf Testl",
  "username": "test007",
  "password": "asdAppiu#$#@zz&"
}
```

Recieve if successfull:

```json
{
  "id": 18,
  "email": "test@gmail.com",
  "name": "Testf Testl",
  "username": "test007",
  "created_at": "2019-04-16T19:16:56.470Z"
}
```

---

#### POST `/api/auth/login`

Send in body:

```json
{
  "username": "test007",
  "password": "asdAppiu#$#@zz&"
}
```

Recieve if successfull:

```json
{
  "id": 18,
  "account_created_at": "2019-04-16T19:16:56.470Z",
  "message": "Welcome, test007",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxOCwidXNlciI6InRlc3QwMDciLCJpYXQiOjE1NTU0NDI2OTcsImV4cCI6MTU1NTUyOTA5N30.2-1CNnh-FRZ8HzVGj1ji2iHAu3YESqxlwQZQNp_nZaQ"
}
```

---

#### PUT `/api/user/:id`

```json

```

---

#### DELETE `/api/user/:id`

```json

```

---

#### POST `/api/addresses/:id`

id is the id that is send on successful login

Send token in Authorization header

Send in body:

```json
{
  "address": "test address"
}
```

Recieve if successfull: _THIS WILL CHANGE, WORKING ON IT_

```json
{
  "command": "INSERT",
  "rowCount": 1,
  "oid": 0,
  "rows": [],
  "fields": [],
  "_parsers": [],
  "RowCtor": null,
  "rowAsArray": false
}
```

---

#### GET `/api/addresses/:id`

id is the id that is send on successful login

Send token in Authorization header

Nothing sent in body!

Recieve if successfull:

```json
[
  {
    "id": 31,
    "address": "test address"
  }
]
```

---

#### DELETE `/api/addresses/:id`

id is the id that is send on successful login

Send token in Authorization header

Send in body:

```json
{
  "address_id": "31"
}
```

Recieve if successfull: Status: 204 No Content

---
