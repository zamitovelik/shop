import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearchStore } from '../store/searchStore';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { PaginationComponent } from '../components/Pagination/Pagination';
import '../styles/SearchPage.scss';

export function SearchPage() {
  const {
    searchQuery,
    searchResults,
    searchTotal,
    itemsPerPage,
    loading,
    error,
    clearSearch,
  } = useSearchStore();

  useEffect(() => {
    if (!searchQuery) {
      window.location.href = '/';
    }
  }, [searchQuery]);

  if (!searchQuery) {
    return null;
  }

  const pageCount = Math.ceil(searchTotal / itemsPerPage);

  return (
    <div className="search-page">
      <div className="search-content">
        <Link to="/" className="back-to-home">
          ← Back to All Products
        </Link>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-spinner">
            <p>Searching...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <div className="search-results-grid">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {pageCount > 1 && <PaginationComponent useSearch={true} />}
          </>
        ) : (
          <div className="no-results">
            <h2>No products found</h2>
            <p>
              We couldn't find any products matching "<strong>{searchQuery}</strong>"
            </p>
            <button className="try-again-btn" onClick={clearSearch}>
              <Link to="/">Try Different Search</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
