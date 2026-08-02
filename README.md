# E-Commerce REST API

A RESTful API for an E-Commerce system built using Node.js, Express.js, and PostgreSQL.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Neon PostgreSQL
- Postman
- Nodemon
- dotenv
- CORS

## Project Structure

src/
- config/
  - database.js
- controllers/
  - productsController.js
  - categoriesController.js
  - usersController.js
- middleware/
  - errorHandler.js
- routes/
  - productsRoutes.js
  - categoriesRoutes.js
  - usersRoutes.js
- app.js
- server.js

## Installation

Install the project dependencies:

npm install

Create a `.env` file and configure the required environment variables.

Example:

DATABASE_URL=your_database_connection_string
PORT=3000

Start the development server:

npm run dev

The server runs on:

http://localhost:3000

## API Endpoints

### Products

- GET /api/products
- GET /api/products/:id
- POST /api/products
- PUT /api/products/:id
- PATCH /api/products/:id/status

### Categories

- GET /api/categories
- GET /api/categories/:id
- POST /api/categories
- PUT /api/categories/:id

### Users

- GET /api/users
- GET /api/users/:id
- POST /api/users
- PATCH /api/users/:id/status

## Features

- PostgreSQL database connection using environment variables
- Parameterized SQL queries
- Product management
- Category management
- User management
- Input validation
- Proper HTTP status codes
- JSON responses
- Duplicate email handling
- Invalid ID handling
- Unknown route handling
- Centralized error handling
- Postman API testing

## Security

Sensitive environment variables are stored in `.env`.

The `.env` file is excluded from Git using `.gitignore`.

An `.env.example` file is included as a template without real credentials.

## Author

Ayham Abu Alrub