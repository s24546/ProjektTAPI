import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import swaggerUi from 'swagger-ui-express';
import {
    swordsRouter,
} from './routes/sword/swords';
import {
    oilsRouter,
} from './routes/oil/oils';
import {
    decoctionsRouter,
} from './routes/decoction/decoctions';

const app = express();

// CORS Configuration
const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'X-Content-Type-Options', 'Cache-Control'],
    credentials: true
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Middleware to set headers for all responses
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-eval'");
    next();
});

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Witcher Item Management API',
            version: '1.0.0',
            description: 'API for managing Witcher items like swords, oils, and decoctions',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['restAPI/routes/**/*.js', 'restAPI/routes/**/*.ts'],
};

// Router registrations
app.use('', swordsRouter);
app.use('', oilsRouter);
app.use('', decoctionsRouter);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Witcher Item Management API is running! Check /api-docs for available endpoints.');
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

export default app;
