import React from 'react';

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const DataTable = ({ data, columns }) => {
    if (!data || data.length === 0) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>No results found</div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Try adjusting your filters to see more results.</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            {columns.map((col) => {
                                let value = getNestedValue(item, col.key);

                                if (col.type === 'date') {
                                    value = new Date(value).toLocaleDateString();
                                } else if (col.type === 'boolean') {
                                    value = value ? (
                                        <span style={{ display: 'inline-flex', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, backgroundColor: '#dcfce7', color: '#166534' }}>
                                            Active
                                        </span>
                                    ) : (
                                        <span style={{ display: 'inline-flex', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, backgroundColor: '#f3f4f6', color: '#374151' }}>
                                            Inactive
                                        </span>
                                    );
                                } else if (col.type === 'number' && col.key === 'salary') {
                                    value = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                                } else if (Array.isArray(value)) {
                                    value = value.join(', ');
                                }

                                return (
                                    <td key={col.key}>
                                        {value}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
