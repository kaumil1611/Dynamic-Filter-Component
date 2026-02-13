import { useState, useMemo } from 'react';
import { filterData } from '../utils/filterUtils';

export const useFilters = (initialData) => {
    const [data] = useState(initialData);
    const [filters, setFilters] = useState([]);

    const filteredData = useMemo(() => {
        return filterData(data, filters);
    }, [data, filters]);

    const addFilter = (filter) => {
        setFilters([...filters, { ...filter, id: Date.now() }]);
    };

    const updateFilter = (id, updatedFilter) => {
        setFilters(filters.map(f => f.id === id ? { ...f, ...updatedFilter } : f));
    };

    const removeFilter = (id) => {
        setFilters(filters.filter(f => f.id !== id));
    };

    const clearFilters = () => {
        setFilters([]);
    };

    return {
        filters,
        filteredData,
        addFilter,
        updateFilter,
        removeFilter,
        clearFilters,
        totalCount: data.length,
        filteredCount: filteredData.length
    };
};
