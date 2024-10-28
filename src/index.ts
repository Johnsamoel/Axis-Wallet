import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.Router';
import userRoutes from './routes/users.Router';
import accountRoutes from './routes/accounts.Router';
import {limiter} from './utils/validations/rateLimiting';
import { IsAuthunticated } from './middlewares/isAuthenticated';
import swaggerUi from 'swagger-ui-express';
import { connect } from './prisma/client';
import { swaggerDocs } from './swaggerdoc';
import corsMiddleware from 'cors';

export let app = express();

// Start the server
const PORT = process.env.PORT; 
app.listen(PORT, async () => {
  await connect();
  console.log(`Server is running on port ${PORT}`);
});

// Middleware for security and parsing
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
// app.use(limiter);

// cors to specify which site to serve
app.use(corsMiddleware({
  origin: ['*'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));


// Authentication routes
app.use('/auth', authRoutes);

// Serve swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// is Authenticated middleware
app.use(IsAuthunticated);

// user Routes
app.use('/users', userRoutes)

// accounts Routes
app.use('/accounts', accountRoutes)



// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
});
function cors(): any {
  throw new Error('Function not implemented.');
}

