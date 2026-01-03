const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/users', require('./modules/users/user.routes'));
app.use('/api/rider', require('./modules/rider/rider.routes'));
app.use('/api/partner', require('./modules/partner/partner.routes'));
app.use('/api/booking', require('./modules/booking/booking.routes'));

module.exports = app;
