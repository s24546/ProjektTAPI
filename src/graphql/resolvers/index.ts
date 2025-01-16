import { swordResolvers } from './swordResolver';
import { oilResolvers } from './oilResolver';
import { decoctionResolvers } from './decoctionResolver';

export const resolvers = {
    Query: {
        ...swordResolvers.Query,
        ...oilResolvers.Query,
        ...decoctionResolvers.Query
    },
    Mutation: {
        ...swordResolvers.Mutation,
        ...oilResolvers.Mutation,
        ...decoctionResolvers.Mutation
    }
}