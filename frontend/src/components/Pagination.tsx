import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  count: number;
  totalItems: number;
  onPageChange: (selectedPage: number) => void;
  currentPage: number; // Add currentPage to track the current page
}

const Pagination: React.FC<PaginationProps> = ({ count, totalItems, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(totalItems / count); // Total number of pages

  const handlePageClick = (data: { selected: number }) => {
    onPageChange(data.selected);
  };

  return (
    <div className="pagination-controls">
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={2}  // Number of pages to show around the current page
        marginPagesDisplayed={1}  // Number of page buttons on the edges
        onPageChange={handlePageClick}
        containerClassName="pagination"  // Container for pagination buttons
        activeClassName="active-page"  // Class for the active page
        previousLabel={"<"}  // Previous page button label
        nextLabel={">"}  // Next page button label
        breakLabel={"..."}  // Label for breaks between pages
        forcePage={currentPage}  // Force the currently selected page to display as active
      />
    </div>
  );
};

export default Pagination;
