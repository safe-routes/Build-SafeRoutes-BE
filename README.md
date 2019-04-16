# Safe Routes Project

## Endpoints (For Frontend Usage)

- Base URL: `https://saferoutes-4-12.herokuapp.com`

### Sign up and Login and Delete Account

#### POST `/api/auth/register`:

description: registers user

- requires: `{ "email": "johndoe@gmail.com", "name": "John Doe", "username": "johndoe007", "password": "&&jfjRREv@vA553@##" }`

- returns: `{ "email": "johndoe@gmail.com", "name": "John Doe", "username": "johndoe007"}`

#### POST `/api/auth/login`:

description: logs in user for 24 hours

- requires: `{ "username": "johndoe007", "password": "&&jfjRREv@vA553@##" }`

- returns: `{ "id": 30, "account_created_at": "2019-04-15 18:05:45", "message": "Welcome, johndoe007", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VyIjoiam9obmRvZTAwNyIsImlhdCI6MTU1NTI2MTA3NiwiZXhwIjoxNTU1MzQ3NDc2fQ.TTFRQopW7fQKZmeRE5vmgW4TPwFj7kOJ9xi6A8NWFXs" }`

#### PUT `/api/user/:id`:

description: updates username

- Todo

#### DELETE `/api/user/:id`: (requires token in headers)

description: deletes user

_warning: this will delete all user info_

- Todo

### Addresses / Intersections (all require token in headers)

#### POST `/api/addresses/:id`: (id is user id sent on login, would be 30 in this case)

description: saves a user's address/intersection/marker/longitude, latitude TBD! (string no matter the case)

- requires: `{ "address": "Spacex, Rocket Rd, Hawthorne, CA 90250" }`

- returns: `{ "user_id": 30, "id": 44, "address": "Spacex, Rocket Rd, Hawthorne, CA 90250", "created_at": "2019-04-16 03:09:34" }`

#### GET `/api/addresses/:id`: (id is user id sent on login)

description: gets all user's saved addresses

- requires: no body

- returns: `[ { "id": 44, "address": "Spacex, Rocket Rd, Hawthorne, CA 90250" }, ... ]`

#### DELETE `/api/addresses/:id`: (id is user id sent on login)

description: deletes a user's address by address id

- requires: `{ "address_id": 44}`

- returns: 204 No Content if the address was found and deleted, 404 Not found if it was not found

### Groups (all require token in headers)

description: end points for groups

- Todo

### Routes (all require token in headers)

description: endpoints for routes

- Todo
