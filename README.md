# Safe Routes Project

## Endpoints (For Frontend Usage)

- Base URL: `https://saferoutes-4-12.herokuapp.com`

| User Endpoints            | Description      |
| ------------------------- | ---------------- |
| POST `/api/auth/register` | Registers User   |
| POST `/api/auth/login`    | Logs in User     |
| PUT `/api/user/:id`       | Updates Username |
| DELETE `/api/user/:id`    | Deletes User     |

| Address Endpoints           | Description               |
| --------------------------- | ------------------------- |
| POST `/api/addresses/:id`   | Saves an address for User |
| GET `/api/addresses/:id`    | Gets User's addresses     |
| DELETE `/api/addresses/:id` | Deletes User's address    |

| Group Endpoints                   | Description                           |
| --------------------------------- | ------------------------------------- |
| POST `/api/group`                 | Creates a group with 1 user (creator) |
| POST `/api/group/:id`             | Adds User to a preexisting group      |
| GET `/api/group/:id`              | Gets Group's Info                     |
| DELETE `/api/group/:id/addresses` | Deletes Group's address               |

| Group Messaging Endpoints      | Description                              |
| ------------------------------ | ---------------------------------------- |
| POST `/api/group/:id/messages` | Saves a message for a Group with user_id |
| GET `/api/group/:id/messages`  | Gets Group's Messages                    |

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

Receive if successfull:

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

Receive if successfull:

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

id is the id that is sent back on successful login

Send token in Authorization header

Send in body:

```json
{
  "username": "test007",
  "newUsername": "test123",
  "password": "asdAppiu#$#@zz&"
}
```

Receive if successfull:

```json
{
  "id": 18,
  "email": "test@gmail.com",
  "name": "Testf Testl",
  "username": "test123",
  "created_at": "2019-04-16T19:16:56.470Z"
}
```

---

#### DELETE `/api/user/:id`

id is the id that is sent back on successful login

Send token in Authorization header

Receive if successfull: Status: 204 No Content

---

#### POST `/api/addresses/:id`

id is the id that is sent back on successful login

Send token in Authorization header

Send in body:

```json
{
  "address": "test address"
}
```

Receive if successfull: (201)

```json
{
  "address": "test address"
}
```

---

#### GET `/api/addresses/:id`

id is the id that is sent back on successful login

Send token in Authorization header

Nothing sent in body!

Receive if successfull:

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

id is the id that is sent back on successful login

Send token in Authorization header

Send in body:

```json
{
  "address_id": "31"
}
```

Receive if successfull: Status: 204 No Content

---

#### POST `/api/group`

Send token in Authorization header

Send in body:

```json
{
  "name": "The Avengers",
  "passphrase": "thecoolestpassphrasever",
  "user_id": 1
}
```

Receive if successfull: 201

```json
{
  "id": 15,
  "name": "The Avengers",
  "created_at": "2019-04-17T19:54:40.410Z",
  "user_id": 1
}
```

---

#### POST `/api/group/:id`

Send token in Authorization header

passphrase is the one entered for when the group was initialized (just copy/paste it for now)

id is the id that is sent back on successful login

Send in body:

```json
{
  "groupname": "Saferoutes.............",
  "passphrase": "thecoolestpassphrasever"
}
```

Receive if successfull: 201

```json
{
  "allGroupInfo2": {
    "id": 17,
    "passphrase": "$2a$10$Rq0XwdcWrHlF0p.AdEFP9eT/D0CFCO7jXTYHn9ZEyVRf7netsAgnS",
    "name": "Saferoutes.............",
    "created_at": "2019-04-17T22:05:38.199Z"
  },
  "allUsers": [
    {
      "user_id": 14
    },
    {
      "user_id": 15
    }
  ]
}
```

---

### GET `/api/group/:id`

id id group id

Send token in Authorization header

Send in body:

```json
{
  "name": "Saferoutes............."
}
```

Receive if successfull: 201

```json
{
  "allGroupInfo2": {
    "id": 17,
    "passphrase": "$2a$10$Rq0XwdcWrHlF0p.AdEFP9eT/D0CFCO7jXTYHn9ZEyVRf7netsAgnS",
    "name": "Saferoutes.............",
    "created_at": "2019-04-17T22:05:38.199Z"
  },
  "allUsers": [
    {
      "user_id": 14
    },
    {
      "user_id": 15
    }
  ]
}
```
