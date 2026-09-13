# Expense Tracker API

REST API for user authentication and personal expense management. The project is an Express application backed by MongoDB and deployed to Vercel.

## Documentation

The interactive Swagger UI is served by the application:

- Local: `http://localhost:8080/`
- Vercel: open the root URL of your deployment
- Alternate path: `/api-docs`

Use **Authorize** in Swagger UI and enter the JWT returned by `POST /auth/login`. The API expects the token in the `Authorization` header as a bearer token.

## API Overview

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `GET` | `/api` | No | API information |
| `GET` | `/ping` | No | Health check |
| `POST` | `/auth/signup` | No | Create an account |
| `POST` | `/auth/login` | No | Log in and receive a JWT |
| `GET` | `/products` | JWT | Return sample products |
| `GET` | `/expenses` | JWT | Fetch the current user's expenses |
| `POST` | `/expenses` | JWT | Add an expense |
| `DELETE` | `/expenses/:expenseId` | JWT | Delete an expense |

Request bodies and response details are defined in the Swagger documentation.

## Local Setup

### Requirements

- Node.js 18 or newer
- A MongoDB database

### Install and run

```bash
npm install
npm run dev
```

The production command is:

```bash
npm start
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=8080
MONGO_CONN=mongodb://localhost:27017/expense-tracker
JWT_SECRET=replace-with-a-long-random-secret
```

Do not commit `.env` or expose database credentials and JWT secrets in source control.

## Authentication Flow

1. Call `POST /auth/signup` with `name`, `email`, and `password`.
2. Call `POST /auth/login` with `email` and `password`.
3. Copy the `jwtToken` from the login response.
4. Authorize Swagger UI with that token.
5. Call the protected product and expense endpoints.

Example expense payload:

```json
{
	"text": "Lunch",
	"amount": 12.5
}
```

## Deployment

The included `vercel.json` configures Vercel to run `index.js` as a Node.js serverless function and forward all routes to it. Set `MONGO_CONN` and `JWT_SECRET` in the Vercel project environment variables before deploying.
