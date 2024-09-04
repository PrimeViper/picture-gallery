import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search Anything Here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                aria-label="Search input"
            />
            <button type="submit" aria-label="Search">Search</button>
        </form>
    );
};

export default SearchForm;