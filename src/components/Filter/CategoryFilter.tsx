import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '../../store/productStore';
import './CategoryFilter.scss'

const CATEGORY_ICONS: Record<string, string> = {
  beauty: '',
  fragrances: '',
  furniture: '',
  groceries: '',
  'home-decoration': '',
  'kitchen-accessories': '',
  laptops: '',
  'mens-shirts': '',
  'mens-shoes': '',
  'mens-watches': '',
  'mobile-accessories': '',
  motorcycle: '',
  'skin-care': '',
  smartphones: '',
  'sports-accessories': '',
  sunglasses: '',
  tablets: '',
  tops: '',
  vehicle: '',
  'womens-bags': '',
  'womens-dresses': '',
  'womens-jewellery': '',
  'womens-shoes': '',
  'womens-watches': '',
};

function formatCategory(slug: string) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function CategoryFilter() {
  const { t } = useTranslation();
  const { categories, selectedCategory, fetchCategories, setCategory } = useProductStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="category-filter">
      <div className="category-title">{t('categories.title')}</div>

      <button
        className={`category-item${!selectedCategory ? ' active' : ''}`}
        onClick={() => setCategory(null)}
      >
        
        <span className="cat-label">{t('categories.all')}</span>
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-item${selectedCategory === cat ? ' active' : ''}`}
          onClick={() => setCategory(selectedCategory === cat ? null : cat)}
        >
          <span className="cat-icon">{CATEGORY_ICONS[cat] ?? ''}</span>
          <span className="cat-label">{formatCategory(cat)}</span>
        </button>
      ))}
    </div>
  );
}
