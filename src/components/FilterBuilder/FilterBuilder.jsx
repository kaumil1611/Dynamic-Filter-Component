import React from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { FilterRow } from './FilterRow';

export const FilterBuilder = ({
    filters,
    fields,
    onAddFilter,
    onUpdateFilter,
    onRemoveFilter,
    onClearFilters
}) => {
    return (
        <div className="card">
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Filters</h2>
                {filters.length > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        style={{ color: '#dc2626' }}
                    >
                        <X style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                        Clear All
                    </Button>
                )}
            </div>

            <div className="flex flex-col gap-4">
                {filters.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0', color: '#6b7280', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px dashed #e5e7eb' }}>
                        <p>No active filters. Add a filter to get started.</p>
                    </div>
                ) : (
                    filters.map((filter, index) => (
                        <div key={filter.id} style={{ position: 'relative' }}>
                            <FilterRow
                                filter={filter}
                                fields={fields}
                                onUpdate={onUpdateFilter}
                                onRemove={onRemoveFilter}
                            />
                            {index < filters.length - 1 && (
                                <div style={{ position: 'absolute', bottom: '-12px', left: '2rem', width: '2px', height: '12px', backgroundColor: '#e5e7eb' }}></div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                <Button onClick={onAddFilter} variant="outline">
                    <Plus style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                    Add Filter
                </Button>
            </div>
        </div>
    );
};
