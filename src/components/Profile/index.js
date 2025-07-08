import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const {userId} = useParams()

  useEffect(() => {
    fetchUserData()
  }, [userId])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      // If userId is provided in URL, use it; otherwise default to user 1
      const userIdToFetch = userId || 1
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userIdToFetch}`)
      
      if (!response.ok) {
        throw new Error('User not found')
      }
      
      const data = await response.json()
      setUser(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching user data:', error)
      // If user not found, try to fetch user 1 as fallback
      if (userId && userId !== '1') {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
          const data = await response.json()
          setUser(data)
        } catch (fallbackError) {
          console.error('Fallback error:', fallbackError)
        }
      }
      setLoading(false)
    }
  }

  const handleBackClick = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className="profile-container">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="profile-container">
        <Header />
        <div className="profile-content">
          <div className="profile-header">
            <button className="back-button" onClick={handleBackClick}>
              ← Back to Dashboard
            </button>
          </div>
          <div className="error-message">
            User not found. Please try again.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <header className="header-container">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">S</div>
          <span className="logo-text">WIFT</span>
        </div>
        <div className="user-section">
          <div className="user-avatar">{user?.name?.split(' ').map(n => n[0]).join('')}</div>
          <span className="user-name">{user?.name}</span>
        </div>
      </div>
    </header>
      <div className="profile-content">
        <div className="profile-header">
          <button className="back-button" onClick={handleBackClick}>
            ← Welcome, {user?.name}
          </button>
        </div>
        
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {user?.name?.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="profile-basic-info">
              <h2 className="profile-name">{user?.name}</h2>
              <p className="profile-email">{user?.email}</p>
            </div>
          </div>
          
          <div className="profile-details">
            <div className="profile-details-grid">
              <div className="profile-field">
                <label className="field-label">User ID</label>
                <div className="field-value">{user?.id}</div>
              </div>
              
              <div className="profile-field">
                <label className="field-label">Name</label>
                <div className="field-value">{user?.name}</div>
              </div>
              
              <div className="profile-field">
                <label className="field-label">Email ID</label>
                <div className="field-value">{user?.email}</div>
              </div>
              
              <div className="profile-field">
                <label className="field-label">Address</label>
                <div className="field-value">
                  {user?.address?.street}, {user?.address?.suite}, {user?.address?.city}, {user?.address?.zipcode}
                </div>
              </div>
              
              <div className="profile-field">
                <label className="field-label">Phone</label>
                <div className="field-value">{user?.phone}</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile