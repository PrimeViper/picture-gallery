import React, { useState } from 'react';
import SearchForm from './components/searchForm';
import ImageGallery from './components/ImageGallery';
import './App.css';

const App = () => {
    const [keyword, setKeyword] = useState('');

    const handleSearch = (query) => {
        setKeyword(query);
    };

    return (
        <div className="App">
            <h1>Picture Gallery</h1>
            <SearchForm onSearch={handleSearch} />
            <ImageGallery keyword={keyword} />
        </div>
    );
};

export default App;