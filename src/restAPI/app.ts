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
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'X-Content-Type-Options', 'Cache-Control'],
    credentials: true
};

// Middleware
app.use(express.json()); ////co robi ta linijka? automatycznie przekształca dane JSON na obiekt JavaScript
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
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ['restAPI/routes/**/*.js', 'restAPI/routes/**/*.ts'],
};

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('=========================================');
    console.log('Incoming request:', req.method, req.url);
    console.log('Query parameters:', req.query);
    console.log('=========================================');
    next();
});

// Router registrations
app.use('/api/swords', swordsRouter);
app.use('/api/oils', oilsRouter);
app.use('/api/decoctions', decoctionsRouter);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Witcher Item Management API is running! Check /api-docs for available endpoints.');
});

// Start server
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});

export default app;
