import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import fs from 'fs';
import cors from 'cors';
import { resolvers } from './resolvers';

const typeDefs = fs.readFileSync('./src/graphql/schemas/schema.graphql', { encoding: 'utf-8' });

const app = express();
app.use(express.json());

// CORS configuration
const corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'X-Content-Type-Options', 'Cache-Control'],
    credentials: true,
};

app.use(cors(corsOptions));

// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start the server
const startServer = async () => {
    await server.start();

    app.use('/graphql',
        cors<cors.CorsRequest>(corsOptions),
        express.json(),
        expressMiddleware(server)
    );

    app.listen(3000, () => {
        console.log('GraphQL Server is running at http://localhost:3000/graphql');
    });
};

startServer();