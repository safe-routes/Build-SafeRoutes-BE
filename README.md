# Safe Routes Project

## Endpoints (For Frontend Usage)

- Base URL: `https://saferoutes-4-12.herokuapp.com`

## Sign up and Login

### POST `/api/auth/register`:

- requires shape: `{ "email": "johndoe@gmail.com", "name": "John Doe", "username": "johndoe007", "password": "&&jfjRREv@vA553@##" }`

- returns `{ "id": 3, "email": "johndoe@gmail.com", "name": "John Doe", "username": "johndoe007", "created_at": "2019-04-14 16:56:07" }`

### POST `/api/auth/login`:

- requires shape: `{ "username": "johndoe007", "password": "&&jfjRREv@vA553@##" }`

- returns `{ "message": "Welcome, johndoe007", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VyIjoiam9obmRvZTAwNyIsImlhdCI6MTU1NTI2MTA3NiwiZXhwIjoxNTU1MzQ3NDc2fQ.TTFRQopW7fQKZmeRE5vmgW4TPwFj7kOJ9xi6A8NWFXs" }`

## Addresses / Intersections

## Groups

## Routes
