import express, { Application } from 'express';
import cors from 'cors';
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error.middleware';

// Import routes
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';
import riderRoutes from './modules/riders/rider.routes';
import partnerRoutes from './modules/partner/partner.routes';
import bookingRoutes from './modules/booking/booking.routes';
import rideRoutes from './modules/ride/ride.routes';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/riders', riderRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/ride', rideRoutes);

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

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error handler
app.use(errorMiddleware);

export default app;
