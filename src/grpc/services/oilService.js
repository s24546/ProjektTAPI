const grpc = require('@grpc/grpc-js');
const { oils } = require('../../data/oils');
const { filterData, sortData, paginateData } = require('./utils');

const getNextId = (items) => {
    return items.length > 0 ? Math.max(...items.map(item => item.id || 0)) + 1 : 1;
};

const oilService = {
    ReadOil: (call, callback) => {
        try {
            const oilId = call.request.id;
            const oil = oils.find(o => o.id === oilId);

            if (oil) {
                callback(null, oil);
            } else {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Oil not found"
                });
            }
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Internal server error"
            });
        }
    },

    ReadOils: (call, callback) => {
        try {
            let result = [...oils];
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

            callback(null, { oils: result });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Error processing oils data"
            });
        }
    },

    CreateOil: (call, callback) => {
        try {
            const data = call.request;
            if (!data.name || !data.ingredients || data.charges === undefined) {
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    details: "Name, ingredients and charges are required"
                });
                return;
            }

            const newOil = {
                ...data,
                id: getNextId(oils),
                type: 'oil'
            };

            oils.push(newOil);
            callback(null, newOil);
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Error creating oil"
            });
        }
    },

    UpdateOil: (call, callback) => {
        try {
            const oilInfo = call.request;
            const oilIndex = oils.findIndex(o => o.id === oilInfo.id);

            if (oilIndex === -1) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Oil not found"
                });
                return;
            }

            const updatedOil = {
                ...oils[oilIndex],
                ...oilInfo,
                type: 'oil'
            };

            oils[oilIndex] = updatedOil;
            callback(null, updatedOil);
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Error updating oil"
            });
        }
    },

    DeleteOil: (call, callback) => {
        try {
            const oilId = call.request.id;
            const oilIndex = oils.findIndex(o => o.id === oilId);

            if (oilIndex === -1) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Oil not found"
                });
                return;
            }

            oils.splice(oilIndex, 1);
            callback(null, {
                success: true,
                message: "Oil successfully deleted"
            });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: "Error deleting oil"
            });
        }
    }
};

module.exports = oilService;