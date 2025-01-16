export const applyStringFilter = (value: string, filter: any) => {
    if (filter.eq && value !== filter.eq) return false;
    if (filter.contains && !value.includes(filter.contains)) return false;
    if (filter.ne && value === filter.ne) return false;
    if (filter.notContains && value.includes(filter.notContains)) return false;
    return true;
};

export const applyIntFilter = (value: number, filter: any) => {
    if (filter.eq && value !== filter.eq) return false;
    if (filter.gt && value <= filter.gt) return false;
    if (filter.lt && value >= filter.lt) return false;
    if (filter.gte && value < filter.gte) return false;
    if (filter.lte && value > filter.lte) return false;
    return true;
};

export const applySort = (data: any[], sortField: string, sortOrder: 'asc' | 'desc') => {
    return data.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });
};

export const applyPagination = (data: any[], page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
};