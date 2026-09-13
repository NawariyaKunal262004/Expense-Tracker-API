const openapiSpecification = {
    openapi: '3.0.3',
    info: {
        title: 'Expense Tracker API',
        version: '1.0.0',
        description: 'API for user authentication and personal expense management.'
    },
    servers: [{ url: '/', description: 'Current server' }],
    tags: [
        { name: 'Health', description: 'Service status' },
        { name: 'Authentication', description: 'Account registration and login' },
        { name: 'Products', description: 'Protected sample product data' },
        { name: 'Expenses', description: 'Protected personal expense operations' }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Paste the JWT returned by /auth/login.'
            }
        },
        schemas: {
            AuthCredentials: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string', format: 'email', example: 'kunal@example.com' },
                    password: { type: 'string', minLength: 4, example: 'password123' }
                }
            },
            SignupRequest: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: { type: 'string', minLength: 3, maxLength: 100, example: 'Kunal' },
                    email: { type: 'string', format: 'email', example: 'kunal@example.com' },
                    password: { type: 'string', minLength: 4, example: 'password123' }
                }
            },
            ExpenseRequest: {
                type: 'object',
                required: ['text', 'amount'],
                properties: {
                    text: { type: 'string', example: 'Lunch' },
                    amount: { type: 'number', example: 12.5 }
                }
            },
            ApiMessage: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    success: { type: 'boolean' }
                }
            }
        }
    },
    paths: {
        '/api': {
            get: {
                tags: ['Health'],
                summary: 'Get API information',
                responses: {
                    200: {
                        description: 'API information',
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiMessage' } } }
                    }
                }
            }
        },
        '/ping': {
            get: {
                tags: ['Health'],
                summary: 'Check service availability',
                responses: { 200: { description: 'PONG' } }
            }
        },
        '/auth/signup': {
            post: {
                tags: ['Authentication'],
                summary: 'Create a user account',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/SignupRequest' } } }
                },
                responses: {
                    201: { description: 'Account created' },
                    400: { description: 'Invalid request' },
                    409: { description: 'Email already exists' }
                }
            }
        },
        '/auth/login': {
            post: {
                tags: ['Authentication'],
                summary: 'Log in and receive a JWT',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthCredentials' } } }
                },
                responses: {
                    200: { description: 'Login successful; response contains jwtToken' },
                    400: { description: 'Invalid request' },
                    403: { description: 'Invalid credentials' }
                }
            }
        },
        '/products': {
            get: {
                tags: ['Products'],
                summary: 'Get sample products',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: 'Product list' },
                    403: { description: 'Missing or invalid JWT' }
                }
            }
        },
        '/expenses': {
            get: {
                tags: ['Expenses'],
                summary: 'Fetch the authenticated user expenses',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: 'Expense list' },
                    403: { description: 'Missing or invalid JWT' }
                }
            },
            post: {
                tags: ['Expenses'],
                summary: 'Add an expense',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/ExpenseRequest' } } }
                },
                responses: {
                    200: { description: 'Expense added' },
                    403: { description: 'Missing or invalid JWT' }
                }
            }
        },
        '/expenses/{expenseId}': {
            delete: {
                tags: ['Expenses'],
                summary: 'Delete an expense',
                security: [{ bearerAuth: [] }],
                parameters: [{
                    name: 'expenseId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'MongoDB expense identifier'
                }],
                responses: {
                    200: { description: 'Expense deleted' },
                    403: { description: 'Missing or invalid JWT' }
                }
            }
        }
    }
};

module.exports = openapiSpecification;