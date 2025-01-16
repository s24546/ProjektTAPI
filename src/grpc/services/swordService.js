const grpc = require('@grpc/grpc-js');
const { swords } = require('../../data/swords');
const { filterData, sortData, paginateData } = require('./utils');

const getNextId = (items) => {
    return items.length > 0 ? Math.max(...items.map(item => item.id || 0)) + 1 : 1;
};

const swordService = {
    ReadSword: (call, callback) => {
        try {
            const swordId = call.request.id;
            const sword = swords.find(s => s.id === swordId);

            if (sword) {
                callback(null, sword);
            } else {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Sword not found"
                });
            }
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Internal server error"
            });
        }
    },

    ReadSwords: (call, callback) => {
        try {
            let result = [...swords];
            const query = call.request;

            if (query.filters && query.filters.length > 0) {
                result = filterData(result, query.filters);
            }

            if (query.sorts && query.sorts.length > 0) {
                result = sortData(result, query.sorts);
            }

            if (query.pagination) {
                result = paginateData(result, query.pagination);
            }

            callback(null, { swords: result });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Error processing swords data"
            });
        }
    },

    CreateSword: (call, callback) => {
        try {
            const data = call.request;
            if (!data.name || !data.material) {
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    details: "Name and material are required"
                });
                return;
            }

            const newSword = {
                ...data,
                id: getNextId(swords),
                type: 'sword'
            };

            swords.push(newSword);
            callback(null, newSword);
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Error creating sword"
            });
        }
    },

    UpdateSword: (call, callback) => {
        try {
            const swordInfo = call.request;
            const swordIndex = swords.findIndex(s => s.id === swordInfo.id);

            if (swordIndex === -1) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Sword not found"
                });
                return;
            }

            const updatedSword = {
                ...swords[swordIndex],
                ...swordInfo,
                type: 'sword'
            };

            swords[swordIndex] = updatedSword;
            callback(null, updatedSword);
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Error updating sword"
            });
        }
    },

    DeleteSword: (call, callback) => {
        try {
            const swordId = call.request.id;
            const swordIndex = swords.findIndex(s => s.id === swordId);

            if (swordIndex === -1) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Sword not found"
                });
                return;
            }

            swords.splice(swordIndex, 1);
            callback(null, {
                success: true,
                message: "Sword successfully deleted"
            });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Error deleting sword"
            });
        }
    }
};

module.exports = swordService;