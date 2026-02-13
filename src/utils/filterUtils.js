
export const OPERATORS = {
    text: [
        { value: 'contains', label: 'Contains' },
        { value: 'not_contains', label: 'Does Not Contain' },
        { value: 'equals', label: 'Equals' },
        { value: 'starts_with', label: 'Starts With' },
        { value: 'ends_with', label: 'Ends With' },
    ],
    number: [
        { value: 'equals', label: 'Equals' },
        { value: 'gt', label: 'Greater Than' },
        { value: 'lt', label: 'Less Than' },
        { value: 'gte', label: 'Greater Than or Equal' },
        { value: 'lte', label: 'Less Than or Equal' },
        { value: 'between', label: 'Between' },
    ],
    date: [
        { value: 'equals', label: 'Equals' },
        { value: 'after', label: 'After' },
        { value: 'before', label: 'Before' },
        { value: 'between', label: 'Between' },
    ],
    boolean: [
        { value: 'equals', label: 'Is' },
    ],
    'single-select': [
        { value: 'equals', label: 'Is' },
        { value: 'not_equals', label: 'Is Not' },
    ],
    'multi-select': [
        { value: 'in', label: 'In' },
        { value: 'not_in', label: 'Not In' },
    ],
};

const getNestedValue = (obj, path) => {
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length; i++) {
        if (current === undefined || current === null) {
            return undefined;
        }
        current = current[parts[i]];
    }
    return current;
};

export const filterData = (data, filters) => {
    if (!filters || filters.length === 0) {
        return data;
    }

    const result = [];

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        let isMatch = true;

        for (let j = 0; j < filters.length; j++) {
            const filter = filters[j];
            const itemValue = getNestedValue(item, filter.field);

            switch (filter.type) {
                case 'text': {
                    const stringValue = String(itemValue).toLowerCase();
                    const filterValue = (filter.value || '').toLowerCase();

                    switch (filter.operator) {
                        case 'contains':
                            if (!stringValue.includes(filterValue)) isMatch = false;
                            break;
                        case 'not_contains':
                            if (stringValue.includes(filterValue)) isMatch = false;
                            break;
                        case 'equals':
                            if (stringValue !== filterValue) isMatch = false;
                            break;
                        case 'starts_with':
                            if (!stringValue.startsWith(filterValue)) isMatch = false;
                            break;
                        case 'ends_with':
                            if (!stringValue.endsWith(filterValue)) isMatch = false;
                            break;
                    }
                    break;
                }

                case 'number': {
                    const numValue = Number(itemValue);
                    const filterVal = Number(filter.value);

                    switch (filter.operator) {
                        case 'equals':
                            if (numValue !== filterVal) isMatch = false;
                            break;
                        case 'gt':
                            if (numValue <= filterVal) isMatch = false;
                            break;
                        case 'lt':
                            if (numValue >= filterVal) isMatch = false;
                            break;
                        case 'gte':
                            if (numValue < filterVal) isMatch = false;
                            break;
                        case 'lte':
                            if (numValue > filterVal) isMatch = false;
                            break;
                        case 'between': {
                            const min = Number(filter.value.min);
                            const max = Number(filter.value.max);
                            if (numValue < min || numValue > max) isMatch = false;
                            break;
                        }
                    }
                    break;
                }

                case 'date': {
                    if (!itemValue) {
                        isMatch = false;
                    } else {
                        const dateValue = new Date(itemValue);
                        // Reset time to midnight for easier comparison
                        dateValue.setHours(0, 0, 0, 0);

                        switch (filter.operator) {
                            case 'equals': {
                                const filterDate = new Date(filter.value);
                                filterDate.setHours(0, 0, 0, 0);
                                if (dateValue.getTime() !== filterDate.getTime()) isMatch = false;
                                break;
                            }
                            case 'after': {
                                const filterDate = new Date(filter.value);
                                filterDate.setHours(23, 59, 59, 999);
                                if (dateValue <= filterDate) isMatch = false;
                                break;
                            }
                            case 'before': {
                                const filterDate = new Date(filter.value);
                                filterDate.setHours(0, 0, 0, 0);
                                if (dateValue >= filterDate) isMatch = false;
                                break;
                            }
                            case 'between': {
                                const start = new Date(filter.value.min);
                                start.setHours(0, 0, 0, 0);
                                const end = new Date(filter.value.max);
                                end.setHours(23, 59, 59, 999);
                                if (dateValue < start || dateValue > end) isMatch = false;
                                break;
                            }
                        }
                    }
                    break;
                }

                case 'boolean': {
                    const boolValue = (filter.value === 'true' || filter.value === true);
                    if (itemValue !== boolValue) isMatch = false;
                    break;
                }

                case 'single-select': {
                    switch (filter.operator) {
                        case 'equals':
                            if (itemValue !== filter.value) isMatch = false;
                            break;
                        case 'not_equals':
                            if (itemValue === filter.value) isMatch = false;
                            break;
                    }
                    break;
                }

                case 'multi-select': {
                    if (Array.isArray(itemValue)) {
                        let hasIntersection = false;
                        for (let k = 0; k < itemValue.length; k++) {
                            if (filter.value.includes(itemValue[k])) {
                                hasIntersection = true;
                                break;
                            }
                        }

                        switch (filter.operator) {
                            case 'in':
                                if (!hasIntersection) isMatch = false;
                                break;
                            case 'not_in':
                                if (hasIntersection) isMatch = false;
                                break;
                        }
                    } else {
                        isMatch = false;
                    }
                    break;
                }
            }

            if (!isMatch) break;
        }

        if (isMatch) {
            result.push(item);
        }
    }

    return result;
};
