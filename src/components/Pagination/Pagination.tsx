import { useProductStore } from '../../store/productStore';
import { useSearchStore } from '../../store/searchStore';
import './Pagination.scss'

interface PaginationComponentProps {
  useSearch?: boolean;
}

export function PaginationComponent({ useSearch = false }: PaginationComponentProps) {
  const productState = useProductStore();
  const searchState = useSearchStore();

  const itemsPerPage = useSearch ? searchState.itemsPerPage : productState.itemsPerPage;
  const total = useSearch ? searchState.searchTotal : productState.total;
  const currentPage = useSearch ? searchState.currentPage : productState.currentPage;
  const setCurrentPage = useSearch ? searchState.setCurrentPage : productState.setCurrentPage;

  const pageCount = Math.ceil(total / itemsPerPage);
  const pages = [];

  // Calculate visible page numbers
  const startPage = Math.max(0, currentPage - 2);
  const endPage = Math.min(pageCount - 1, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePageClick = (pageNum: number) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (pageCount <= 1) return null;

  return (
    <div className="pagination-container">
      <div className="pagination">
        {currentPage > 0 && (
          <button
            className="page-link"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            ← Previous
          </button>
        )}

        {startPage > 0 && (
          <>
            <button className="page-link" onClick={() => handlePageClick(0)}>
              1
            </button>
            {startPage > 1 && <span className="page-ellipsis">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            className={`page-link ${page === currentPage ? 'active' : ''}`}
            onClick={() => handlePageClick(page)}
          >
            {page + 1}
          </button>
        ))}

        {endPage < pageCount - 1 && (
          <>
            {endPage < pageCount - 2 && <span className="page-ellipsis">...</span>}
            <button
              className="page-link"
              onClick={() => handlePageClick(pageCount - 1)}
            >
              {pageCount}
            </button>
          </>
        )}

        {currentPage < pageCount - 1 && (
          <button
            className="page-link"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
