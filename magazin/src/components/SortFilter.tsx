import { useProductStore } from '../store/productStore';
import '../styles/SortFilter.scss';

export function SortFilter() {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useProductStore();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  return (
    <div className="sort-filter-container">
      <div className="sort-group">
        <label htmlFor="sortBy">Sort By:</label>
        <select
          id="sortBy"
          value={sortBy || ''}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="">Default</option>
          <option value="title">Title (A-Z)</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>
      </div>

      <div className="sort-group">
        <label htmlFor="sortOrder">Order:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleOrderChange}
          className="sort-select"
        >
          <option value="asc">Ascending ↑</option>
          <option value="desc">Descending ↓</option>
        </select>
      </div>
    </div>
  );
}
