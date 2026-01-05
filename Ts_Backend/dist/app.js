"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_middleware_1 = require("./middlewares/error.middleware");
// Import routes
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const rider_routes_1 = __importDefault(require("./modules/riders/rider.routes"));
const partner_routes_1 = __importDefault(require("./modules/partner/partner.routes"));
const booking_routes_1 = __importDefault(require("./modules/booking/booking.routes"));
const ride_routes_1 = __importDefault(require("./modules/ride/ride.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/riders', rider_routes_1.default);
app.use('/api/partners', partner_routes_1.default);
app.use('/api/bookings', booking_routes_1.default);
app.use('/api/ride', ride_routes_1.default);
// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Rider With Stranger API',
            version: '1.0.0',
            description: 'API documentation for Rider With Stranger app',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/modules/**/*.ts'], // all routes with swagger comments
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Error handler
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
