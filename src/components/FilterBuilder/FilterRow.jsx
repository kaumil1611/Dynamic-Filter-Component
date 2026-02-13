import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { OPERATORS } from '../../utils/filterUtils';

export const FilterRow = ({
    filter,
    fields,
    onUpdate,
    onRemove
}) => {
    const selectedFieldDef = fields.find(f => f.key === filter.field);
    const fieldType = selectedFieldDef?.type || 'text';

    const operators = OPERATORS[fieldType] || OPERATORS.text;

    const handleFieldChange = (e) => {
        const newFieldKey = e.target.value;
        const newFieldDef = fields.find(f => f.key === newFieldKey);
        const newType = newFieldDef?.type || 'text';
        const newOperators = OPERATORS[newType] || OPERATORS.text;

        onUpdate(filter.id, {
            field: newFieldKey,
            type: newType,
            operator: newOperators[0].value,
            value: ''
        });
    };

    const handleOperatorChange = (e) => {
        onUpdate(filter.id, { operator: e.target.value });
    };

    const handleValueChange = (e) => {
        onUpdate(filter.id, { value: e.target.value });
    };

    const renderInput = () => {
        if (filter.operator === 'between' && (fieldType === 'number' || fieldType === 'date')) {
            return (
                <div className="flex gap-2 w-full">
                    <Input
                        type={fieldType === 'date' ? 'date' : 'number'}
                        placeholder="Min"
                        value={filter.value?.min || ''}
                        onChange={(e) => onUpdate(filter.id, {
                            value: { ...filter.value, min: e.target.value }
                        })}
                    />
                    <Input
                        type={fieldType === 'date' ? 'date' : 'number'}
                        placeholder="Max"
                        value={filter.value?.max || ''}
                        onChange={(e) => onUpdate(filter.id, {
                            value: { ...filter.value, max: e.target.value }
                        })}
                    />
                </div>
            );
        }

        switch (fieldType) {
            case 'date':
                return (
                    <Input
                        type="date"
                        value={filter.value || ''}
                        onChange={handleValueChange}
                    />
                );
            case 'number':
                return (
                    <Input
                        type="number"
                        value={filter.value || ''}
                        onChange={handleValueChange}
                        placeholder="Value"
                    />
                );
            case 'boolean':
                return (
                    <Select
                        value={filter.value || ''}
                        onChange={handleValueChange}
                        options={[
                            { value: 'true', label: 'True' },
                            { value: 'false', label: 'False' }
                        ]}
                    />
                );
            case 'single-select':
                return (
                    <Select
                        value={filter.value || ''}
                        onChange={handleValueChange}
                        options={selectedFieldDef?.options?.map(opt => ({ value: opt, label: opt })) || []}
                        placeholder="Select Validation"
                    />
                );
            case 'multi-select':
                return (
                    <select
                        multiple
                        value={Array.isArray(filter.value) ? filter.value : []}
                        onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions, option => option.value);
                            onUpdate(filter.id, { value: selected });
                        }}
                        className="input"
                        style={{ height: 'auto', minHeight: '80px' }}
                    >
                        {selectedFieldDef?.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                );
            default:
                return (
                    <Input
                        type="text"
                        value={filter.value || ''}
                        onChange={handleValueChange}
                        placeholder="Value"
                    />
                );
        }
    };

    return (
        <div className="filter-row">
            <div style={{ flex: '1' }}>
                <span className="md:hidden" style={{ fontSize: '0.75rem', color: '#666', marginBottom: '4px', display: 'block' }}>Field</span>
                <Select
                    value={filter.field}
                    onChange={handleFieldChange}
                    options={fields.map(f => ({ value: f.key, label: f.label }))}
                />
            </div>

            <div style={{ flex: '1' }}>
                <span className="md:hidden" style={{ fontSize: '0.75rem', color: '#666', marginBottom: '4px', display: 'block' }}>Operator</span>
                <Select
                    value={filter.operator}
                    onChange={handleOperatorChange}
                    options={operators}
                />
            </div>

            <div style={{ flex: '2' }}>
                <span className="md:hidden" style={{ fontSize: '0.75rem', color: '#666', marginBottom: '4px', display: 'block' }}>Value</span>
                {renderInput()}
            </div>

            <div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(filter.id)}
                    title="Remove filter"
                    aria-label="Remove filter"
                >
                    <Trash2 style={{ width: '20px', height: '20px' }} />
                </Button>
            </div>
        </div>
    );
};
