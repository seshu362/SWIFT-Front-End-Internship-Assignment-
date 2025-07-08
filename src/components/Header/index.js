import React from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const handleProfileClick = () => {
    navigate('/profile')
  }

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">S</div>
          <span className="logo-text">WIFT</span>
        </div>
        <div className="user-section" onClick={handleProfileClick}>
          <div className="user-avatar">EH</div>
          <span className="user-name">Ervin Howell</span>
        </div>
      </div>
    </header>
  )
}

export default Header