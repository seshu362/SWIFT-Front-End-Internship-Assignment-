import React from 'react'
import './index.css'

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange
}) => {
  const handlePageSizeChange = (event) => {
    onPageSizeChange(parseInt(event.target.value))
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 3
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`page-button ${i === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      )
    }
    
    return pages
  }

  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="pagination-container">
      <div className="pagination-right">
        <div className="pagination-info">
          {startItem}-{endItem} of {totalItems} items
        </div>
        
        <div className="pagination-controls">
          <button 
            className="pagination-button"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          
          {renderPageNumbers()}
          
          <button 
            className="pagination-button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
        
        <div className="page-size-container">
          <select 
            className="page-size-select"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10 / Page</option>
            <option value={50}>50 / Page</option>
            <option value={100}>100 / Page</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Pagination