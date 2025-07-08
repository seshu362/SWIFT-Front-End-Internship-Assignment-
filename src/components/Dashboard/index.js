import React, {useState, useEffect} from 'react'
import { FiSearch } from "react-icons/fi";
import Header from '../Header'
import CommentsTable from '../CommentsTable'
import Pagination from '../Pagination'
import './index.css'

const Dashboard = () => {
  const [comments, setComments] = useState([])
  const [filteredComments, setFilteredComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({key: null, direction: null})
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    fetchComments()
    loadSavedState()
  }, [])

  useEffect(() => {
    saveState()
  }, [searchTerm, sortConfig, currentPage, pageSize])

  useEffect(() => {
    applyFilters()
  }, [comments, searchTerm, sortConfig])

  const fetchComments = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://jsonplaceholder.typicode.com/comments')
      const data = await response.json()
      setComments(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching comments:', error)
      setLoading(false)
    }
  }

  const loadSavedState = () => {
    const savedSearch = localStorage.getItem('dashboard_search')
    const savedSort = localStorage.getItem('dashboard_sort')
    const savedPage = localStorage.getItem('dashboard_page')
    const savedPageSize = localStorage.getItem('dashboard_pageSize')

    if (savedSearch) setSearchTerm(savedSearch)
    if (savedSort) setSortConfig(JSON.parse(savedSort))
    if (savedPage) setCurrentPage(parseInt(savedPage))
    if (savedPageSize) setPageSize(parseInt(savedPageSize))
  }

  const saveState = () => {
    localStorage.setItem('dashboard_search', searchTerm)
    localStorage.setItem('dashboard_sort', JSON.stringify(sortConfig))
    localStorage.setItem('dashboard_page', currentPage.toString())
    localStorage.setItem('dashboard_pageSize', pageSize.toString())
  }

  // Function to generate display Post ID starting from 12345670
  const generateDisplayPostId = (originalPostId) => {
    return 12345670 + (originalPostId - 1)
  }

  const applyFilters = () => {
    let filtered = [...comments]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(comment =>
        comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.body.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      filtered.sort((a, b) => {
        let aValue, bValue

        if (sortConfig.key === 'postId') {
          // Sort by display Post ID values
          aValue = generateDisplayPostId(a.postId)
          bValue = generateDisplayPostId(b.postId)
        } else {
          aValue = a[sortConfig.key].toLowerCase()
          bValue = b[sortConfig.key].toLowerCase()
        }

        if (sortConfig.direction === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
    }

    setFilteredComments(filtered)
    setCurrentPage(1)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSort = (key) => {
    let direction = 'asc'
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc'
      } else if (sortConfig.direction === 'desc') {
        direction = null
      }
    }

    setSortConfig({
      key: direction ? key : null,
      direction
    })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return filteredComments.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(filteredComments.length / pageSize)

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <div className="dashboard-controls">
          <div className="sort-controls">
            <button 
              className={`sort-button ${sortConfig.key === 'postId' ? 'active' : ''}`}
              onClick={() => handleSort('postId')}
            >
              Sort Post ID {sortConfig.key === 'postId' && sortConfig.direction === 'asc' && '↑'}
              {sortConfig.key === 'postId' && sortConfig.direction === 'desc' && '↓'}
            </button>
            <button 
              className={`sort-button ${sortConfig.key === 'name' ? 'active' : ''}`}
              onClick={() => handleSort('name')}
            >
              Sort Name {sortConfig.key === 'name' && sortConfig.direction === 'asc' && '↑'}
              {sortConfig.key === 'name' && sortConfig.direction === 'desc' && '↓'}
            </button>
            <button 
              className={`sort-button ${sortConfig.key === 'email' ? 'active' : ''}`}
              onClick={() => handleSort('email')}
            >
              Sort Email {sortConfig.key === 'email' && sortConfig.direction === 'asc' && '↑'}
              {sortConfig.key === 'email' && sortConfig.direction === 'desc' && '↓'}
            </button>
          </div>
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search name, email, comment"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner">Loading...</div>
          </div>
        ) : (
          <>
            <CommentsTable 
              comments={getCurrentPageData()}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredComments.length}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard