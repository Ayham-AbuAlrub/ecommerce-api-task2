# E-commerce REST API – Task 3

## Security Features

- JWT Authentication
- Role-Based Authorization (Admin / Customer)
- Password Hashing using bcrypt
- Input Validation using Zod
- SQL Injection Protection (Parameterized Queries)
- Helmet Security Headers
- CORS Configuration
- Rate Limiting
- Centralized Error Handling
- IDOR Protection
- Environment Variables (.env)

## Technologies

- Node.js
- Express.js
- PostgreSQL (Neon)
- bcrypt
- jsonwebtoken
- helmet
- express-rate-limit
- zod

## Run

```bash
npm install
npm run dev
```

## Environment Variables

```
PORT=
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
```