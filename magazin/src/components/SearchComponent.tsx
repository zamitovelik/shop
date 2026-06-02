import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../store/searchStore';
import '../styles/SearchComponent.scss';

export function SearchComponent() {
  const navigate = useNavigate();
  const { setSearchQuery, performSearch } = useSearchStore();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (inputValue.trim()) {
      setSearchQuery(inputValue);
      await performSearch(0);
      navigate('/search');
    }
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <button
            type="button"
            className="search-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          className="search-button"
          aria-label="Search"
        >
          🔍
        </button>
      </div>
    </form>
  );
}
