import fs from 'fs';
import { GraphQLScalarType, Kind } from 'graphql';
export const resolvers = {
    Query: {
        items: () => [{ id: '1', name: 'Sword', type: 'weapon', description: 'A sharp sword.' }],
        characters: () => [{ id: '1', name: 'Geralt', items: [] }],
        locations: () => [{ id: '1', name: 'Novigrad', items: [] }],
    },
};