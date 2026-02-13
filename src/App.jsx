import React from 'react';
import { Users, Filter } from 'lucide-react';
import { useFilters } from './hooks/useFilters';
import { MOCK_DATA, FIELD_DEFINITIONS } from './data/mockData';
import { FilterBuilder } from './components/FilterBuilder/FilterBuilder';
import { DataTable } from './components/DataTable/DataTable';
import './index.css';

function App() {
  const {
    filters,
    filteredData,
    addFilter,
    updateFilter,
    removeFilter,
    clearFilters,
    totalCount,
    filteredCount
  } = useFilters(MOCK_DATA);

  const handleAddFilter = () => {
    addFilter({
      field: 'name',
      operator: 'contains',
      value: '',
      type: 'text'
    });
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Header */}
        <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div className="flex items-center gap-4">
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--primary-color)', borderRadius: '0.5rem', color: 'white', display: 'flex' }}>
              <Users size={24} />
            </div>
            <div>
              <h1 className="header-title">Employee Directory</h1>
              <p className="header-subtitle">Manage and filter employee records</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="badge">
              <span style={{ color: 'var(--text-muted)' }}>Total Records:</span>
              <span style={{ marginLeft: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>{totalCount}</span>
            </div>
            <div className="badge badge-blue">
              <span>Filtered:</span>
              <span style={{ marginLeft: '0.5rem', fontWeight: 600 }}>{filteredCount}</span>
            </div>
          </div>
        </div>

        {/* Filter Builder */}
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: '1rem', color: '#374151', fontWeight: 500, fontSize: '0.875rem' }}>
            <Filter size={16} />
            <span>Filter Rules</span>
          </div>
          <FilterBuilder
            filters={filters}
            fields={FIELD_DEFINITIONS}
            onAddFilter={handleAddFilter}
            onUpdateFilter={updateFilter}
            onRemoveFilter={removeFilter}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Data Table */}
        <DataTable data={filteredData} columns={FIELD_DEFINITIONS} />

      </div>
    </div>
  );
}

export default App;
