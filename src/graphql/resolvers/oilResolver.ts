import { oils } from '../../data/oils';
import { applyStringFilter, applyIntFilter, applySort, applyPagination } from '../utils/filterUtils';

export const oilResolvers = {
    Query: {
        oils: (_: any, { filter, sort, page, pageSize }: { filter: any, sort: any, page: number, pageSize: number }) => {
            let result = [...oils];

            if (filter) {
                result = result.filter(oil => {
                    return (
                        (!filter.name || applyStringFilter(oil.name, filter.name)) &&
                        (!filter.description || applyStringFilter(oil.description, filter.description)) &&
                        (!filter.ingredients || applyStringFilter(oil.ingredients, filter.ingredients)) &&
                        (!filter.charges || applyIntFilter(oil.charges, filter.charges))
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

        oil: (_: any, { id }: { id: number }) => {
            return oils.find(oil => oil.id === id);
        }
    },

    Mutation: {
        addOil: (_: any, { input }: { input: any }) => {
            const newOil = {
                id: oils.length + 1,
                type: 'oil',
                ...input
            };
            oils.push(newOil);
            return newOil;
        },

        updateOil: (_: any, { id, input }: { id: number, input: any }) => {
            const index = oils.findIndex(oil => oil.id === id);
            if (index !== -1) {
                oils[index] = {
                    ...oils[index],
                    ...input
                };
                return oils[index];
            }
            return null;
        },

        deleteOil: (_: any, { id }: { id: number }) => {
            const index = oils.findIndex(oil => oil.id === id);
            if (index !== -1) {
                const deleted = oils[index];
                oils.splice(index, 1);
                return deleted;
            }
            return null;
        }
    }
};