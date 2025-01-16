import { decoctions } from '../../data/decoctions';
import { applyStringFilter, applyIntFilter, applySort, applyPagination } from '../utils/filterUtils';

export const decoctionResolvers = {
    Query: {
        decoctions: (_: any, { filter, sort, page, pageSize }: { filter: any, sort: any, page: number, pageSize: number }) => {
            let result = [...decoctions];

            if (filter) {
                result = result.filter(decoction => {
                    return (
                        (!filter.name || applyStringFilter(decoction.name, filter.name)) &&
                        (!filter.description || applyStringFilter(decoction.description, filter.description)) &&
                        (!filter.ingredients || applyStringFilter(decoction.ingredients, filter.ingredients)) &&
                        (!filter.toxicity || applyIntFilter(decoction.toxicity, filter.toxicity))
                    );
                });
            }

            if (sort) {
                result = applySort(result, sort.field, sort.order);
            }

            if (page && pageSize) {
                result = applyPagination(result, page, pageSize);
            }

            return result;
        },

        decoction: (_: any, { id }: { id: number }) => {
            return decoctions.find(decoction => decoction.id === id);
        }
    },

    Mutation: {
        addDecoction: (_: any, { input }: { input: any }) => {
            const newDecoction = {
                id: decoctions.length + 1,
                type: 'decoction',
                ...input
            };
            decoctions.push(newDecoction);
            return newDecoction;
        },

        updateDecoction: (_: any, { id, input }: { id: number, input: any }) => {
            const index = decoctions.findIndex(decoction => decoction.id === id);
            if (index !== -1) {
                decoctions[index] = {
                    ...decoctions[index],
                    ...input
                };
                return decoctions[index];
            }
            return null;
        },

        deleteDecoction: (_: any, { id }: { id: number }) => {
            const index = decoctions.findIndex(decoction => decoction.id === id);
            if (index !== -1) {
                const deleted = decoctions[index];
                decoctions.splice(index, 1);
                return deleted;
            }
            return null;
        }
    }
};