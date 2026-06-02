import { useProductStore } from '../../store/productStore';
import { useTranslation } from 'react-i18next';
import './SortFilter.scss'

export function SortFilter() {
  const { t } = useTranslation();
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
        <label htmlFor="sortBy">{t('products.sort_by')}</label>
        <select
          id="sortBy"
          value={sortBy || ''}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="">{t('products.sort_default')}</option>
          <option value="title">{t('products.sort_title')}</option>
          <option value="price">{t('products.sort_price')}</option>
          <option value="stock">{t('products.sort_stock')}</option>
        </select>
      </div>

      <div className="sort-group">
        <label htmlFor="sortOrder">{t('products.order')}</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleOrderChange}
          className="sort-select"
        >
          <option value="asc">{t('products.order_asc')}</option>
          <option value="desc">{t('products.order_desc')}</option>
        </select>
      </div>
    </div>
  );
}
