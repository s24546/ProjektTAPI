const filterData = (data, filters) => {
    return data.filter(item => {
        return filters.every(filter => {
            const value = item[filter.field];
            switch (filter.operator) {
                case 'eq':
                    return value === filter.value;
                case 'contains':
                    return String(value).includes(filter.value);
                case 'gt':
                    return value > Number(filter.value);
                case 'lt':
                    return value < Number(filter.value);
                default:
                    return true;
            }
        });
    });
};

const sortData = (data, sorts) => {
    return [...data].sort((a, b) => {
        for (const sort of sorts) {
            if (a[sort.field] < b[sort.field])
                return sort.ascending ? -1 : 1;
            if (a[sort.field] > b[sort.field])
                return sort.ascending ? 1 : -1;
        }
        return 0;
    });
};

const paginateData = (data, pagination) => {
    const start = (pagination.page - 1) * pagination.pageSize;
    return data.slice(start, start + pagination.pageSize);
};

module.exports = {
    filterData,
    sortData,
    paginateData
};