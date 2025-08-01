import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy, onSearch }) => {
  return (
    <div style={{
      background: '#f8f9fa',
      padding: '15px 30px',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      flexWrap: 'wrap'
    }}>
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px 15px',
          width: '280px',
          borderRadius: '20px',
          border: '1px solid #aaa'
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') onSearch();
        }}
      />
      <button
        onClick={onSearch}
        style={{
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        🔍
      </button>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{
          padding: '10px',
          borderRadius: '20px',
          border: '1px solid #aaa'
        }}
      >
        <option value="">Sort By</option>
        <option value="title">Title (A-Z)</option>
        <option value="price">Price (Low to High)</option>
      </select>
    </div>
  );
};

export default SearchBar;
