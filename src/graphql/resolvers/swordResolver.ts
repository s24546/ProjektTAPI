import { swords } from '../../data/swords';
import { applyStringFilter, applySort, applyPagination } from '../utils/filterUtils';

export const swordResolvers = {
    Query: {
        swords: (_: any, { filter, sort, page, pageSize }: { filter: any, sort: any, page: number, pageSize: number }) => {
            let result = [...swords];

            if (filter) {
                result = result.filter(sword => {
                    return (
                        (!filter.name || applyStringFilter(sword.name, filter.name)) &&
                        (!filter.description || applyStringFilter(sword.description, filter.description)) &&
                        (!filter.material || applyStringFilter(sword.material, filter.material))
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

        sword: (_: any, { id }: { id: number }) => {
            return swords.find(sword => sword.id === id);
        }
    },

    Mutation: {
        addSword: (_: any, { input }: { input: any }) => {
            const newSword = {
                id: swords.length + 1,
                type: 'sword',
                ...input
            };
            swords.push(newSword);
            return newSword;
        },

        updateSword: (_: any, { id, input }: { id: number, input: any }) => {
            const index = swords.findIndex(sword => sword.id === id);
            if (index !== -1) {
                swords[index] = {
                    ...swords[index],
                    ...input
                };
                return swords[index];
            }
            return null;
        },

        deleteSword: (_: any, { id }: { id: number }) => {
            const index = swords.findIndex(sword => sword.id === id);
            if (index !== -1) {
                const deleted = swords[index];
                swords.splice(index, 1);
                return deleted;
            }
            return null;
        }
    }
};