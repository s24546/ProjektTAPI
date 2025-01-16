const grpc = require('@grpc/grpc-js');
const { decoctions } = require('../../data/decoctions');
const { filterData, sortData, paginateData } = require('./utils');

const getNextId = (items) => {
    return items.length > 0 ? Math.max(...items.map(item => item.id || 0)) + 1 : 1;
};

const decoctionService = {
    ReadDecoction: (call, callback) => {
        try {
            const decoctionId = call.request.id;
            const decoction = decoctions.find(d => d.id === decoctionId);

            if (decoction) {
                callback(null, decoction);
            } else {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Decoction not found"
                });
            }
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Internal server error"
            });
        }
    },

    ReadDecoctions: (call, callback) => {
        try {
            let result = [...decoctions];
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

            callback(null, { decoctions: result });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Error processing decoctions data"
            });
        }
    },

    CreateDecoction: (call, callback) => {
        try {
            const data = call.request;
            if (!data.name || !data.ingredients || !data.duration || data.toxicity === undefined) {
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    details: "Name, ingredients, duration and toxicity are required"
                });
                return;
            }

            const newDecoction = {
                ...data,
                id: getNextId(decoctions),
                type: 'decoction'
            };

            decoctions.push(newDecoction);
            callback(null, newDecoction);
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Error creating decoction"
            });
        }
    },

    UpdateDecoction: (call, callback) => {
        try {
            const decoctionInfo = call.request;
            const decoctionIndex = decoctions.findIndex(d => d.id === decoctionInfo.id);

            if (decoctionIndex === -1) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Decoction not found"
                });
                return;
            }

            const updatedDecoction = {
                ...decoctions[decoctionIndex],
                ...decoctionInfo,
                type: 'decoction'
            };

            decoctions[decoctionIndex] = updatedDecoction;
            callback(null, updatedDecoction);
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Error updating decoction"
            });
        }
    },

    DeleteDecoction: (call, callback) => {
        try {
            const decoctionId = call.request.id;
            const decoctionIndex = decoctions.findIndex(d => d.id === decoctionId);

            if (decoctionIndex === -1) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Decoction not found"
                });
                return;
            }

            decoctions.splice(decoctionIndex, 1);
            callback(null, {
                success: true,
                message: "Decoction successfully deleted"
            });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Error deleting decoction"
            });
        }
    }
};

module.exports = decoctionService;