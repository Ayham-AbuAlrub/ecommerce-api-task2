Initial Security Review

This document describes the main security issues identified in the existing E-commerce REST API before applying the security improvements required in Task 3.

1. Insecure Password Handling
Severity: High
Location: src/controllers/usersController.js
Risk: The API receives hash_password directly from the request and stores it in the database without securely hashing the original password. If passwords are stored incorrectly, user accounts may be exposed if the database is compromised.
Evidence: The user creation endpoint inserts the received hash_password value directly into the users table.
Recommended Fix: Accept a normal password field and hash it using bcrypt before storing it. Never return or log the password or password hash.

2. Missing Authentication
Severity: High
Location: API routes
Risk: The API currently has no login mechanism or JWT authentication. Protected endpoints can be accessed without verifying the identity of the requester.
Evidence: There are no /api/auth/login, /api/auth/register, or /api/auth/me routes and no authentication middleware.
Recommended Fix: Implement JWT authentication and middleware that verifies a Bearer token before allowing access to protected routes.

3. Missing Authorization
Severity: High
Location: src/routes/productsRoutes.js and src/routes/usersRoutes.js
Risk: Any requester can currently perform sensitive operations such as creating, updating, or deactivating products and changing user status.
Evidence: Administrative routes do not check whether the authenticated user has the admin role.
Recommended Fix: Add role-based authorization middleware and restrict administrative operations to users with the admin role.

4. IDOR / Unauthorized User Access
Severity: High
Location: GET /api/users/:id
Risk: A requester can access another user's information by changing the ID in the URL.
Evidence: getUserById retrieves the requested user using only the supplied ID without checking resource ownership.
Recommended Fix: Compare the requested user ID with the authenticated user's ID and allow access only to the owner or an administrator.

5. Insufficient Input Validation
Severity: Medium
Location: User and product controllers
Risk: Some input checks exist, but there is no centralized validation for email format, password length, allowed roles, text lengths, IDs, prices, and stock values.
Evidence: Validation is performed manually in individual controller functions and several fields are not fully validated.
Recommended Fix: Use a validation library such as Zod and return a consistent validation error response.

6. Unrestricted CORS Configuration
Severity: Medium
Location: src/app.js
Risk: The current cors() configuration allows requests from any origin.
Evidence: The application uses app.use(cors()) without an allowed-origin configuration.
Recommended Fix: Configure CORS with explicit allowed origins, HTTP methods, and headers.

7. Missing Rate Limiting
Severity: Medium
Location: API routes
Risk: The API does not limit repeated requests, which can allow abuse and repeated login attempts.
Evidence: No rate-limiting middleware is currently configured.
Recommended Fix: Add a general API rate limit and a stricter limit for the login endpoint.

8. Missing Security Headers
Severity: Medium
Location: src/app.js
Risk: Common HTTP security headers are not configured.
Evidence: Helmet middleware is not installed or used.
Recommended Fix: Install and enable Helmet before application routes.

9. Unsafe Error Logging and Error Responses
Severity: Medium
Location: Controllers and src/middleware/errorHandler.js
Risk: Full internal error objects are logged directly, and the global error handler may return error.message to the client. Internal information could be exposed.
Evidence: Controllers and the error handler use console.error(error), while the error handler sends error.message.
Recommended Fix: Use centralized safe error handling, return generic production messages, and log only appropriate internal details without passwords, tokens, database URLs, or other secrets.



The current API is functionally operational but requires additional security controls. The next steps will implement secure password hashing, JWT authentication, authorization, ownership checks, centralized validation, restricted CORS, Helmet security headers, rate limiting, and safe error handling.