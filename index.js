const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/Auth');
const swaggerUi = require('swagger-ui-express');
const openapiSpecification = require('./swagger');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

module.exports = app;

app.get('/api', (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to the Expense Tracker API!",
        version: "1.0.0",
        documentation: "https://github.com/NawariyaKunal262004/Expense-Tracker-API/tree/main#readme"
    });
});

app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses',ensureAuthenticated , ExpenseRouter);


if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
}

module.exports = app;