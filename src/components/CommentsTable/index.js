import React from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'

const CommentsTable = ({comments, sortConfig, onSort}) => {
  const navigate = useNavigate()

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓'
    }
    return ''
  }

  const handleRowClick = (postId) => {
    navigate(`/profile/${postId}`)
  }

  // Function to generate display Post ID starting from 12345670
  const generateDisplayPostId = (originalPostId) => {
    return 12345670 + (originalPostId - 1)
  }

  return (
    <div className="comments-table-container">
      <div className="table-header">
        <div className="header-cell post-id-cell">
          <button 
            className="header-button"
            onClick={() => onSort('postId')}
          >
            Post ID {getSortIcon('postId')}
          </button>
        </div>
        <div className="header-cell name-cell">
          <button 
            className="header-button"
            onClick={() => onSort('name')}
          >
            Name {getSortIcon('name')}
          </button>
        </div>
        <div className="header-cell email-cell">
          <button 
            className="header-button"
            onClick={() => onSort('email')}
          >
            Email {getSortIcon('email')}
          </button>
        </div>
        <div className="header-cell comment-cell">
          Comment
        </div>
      </div>
      
      <div className="table-body">
        {comments.map((comment) => (
          <div 
            key={comment.id}
            className="table-row clickable-row"
            onClick={() => handleRowClick(comment.postId)}
          >
            <div className="table-cell post-id-cell">
              {generateDisplayPostId(comment.postId)}
            </div>
            <div className="table-cell name-cell">
              {comment.name}
            </div>
            <div className="table-cell email-cell">
              {comment.email}
            </div>
            <div className="table-cell comment-cell">
              {comment.body.substring(0, 100)}...
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentsTable