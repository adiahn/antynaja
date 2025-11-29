import { useState, useEffect } from 'react'
import './PostsList.css'

function PostsList({ onBack }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedPosts, setExpandedPosts] = useState(new Set())

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://opportunitieshub.ng/wp-json/wp/v2/posts')
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        
        const data = await response.json()
        setPosts(data)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const togglePost = (postId) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const isExpanded = (postId) => {
    return expandedPosts.has(postId)
  }

  const sanitizeHtml = (html) => {
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    const links = tmp.querySelectorAll('a')
    links.forEach(link => {
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'noopener noreferrer')
    })
    return tmp.innerHTML
  }

  if (loading) {
    return (
      <div className="posts-container">
        <header className="posts-header">
          <button onClick={onBack} className="back-button">
            ← Back
          </button>
          <h1>Opportunities</h1>
        </header>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="posts-container">
        <header className="posts-header">
          <button onClick={onBack} className="back-button">
            ← Back
          </button>
          <h1>Opportunities</h1>
        </header>
        <div className="error-state">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="posts-container">
      <header className="posts-header">
        <button onClick={onBack} className="back-button">
          ← Back
        </button>
        <h1>Opportunities</h1>
        <p className="posts-count">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
      </header>
      <div className="posts-list">
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts available</p>
          </div>
        ) : (
          posts.map((post) => {
            const expanded = isExpanded(post.id)
            return (
              <article key={post.id} className={`post-card ${expanded ? 'expanded' : ''}`}>
                <div className="post-header">
                  <h2 className="post-title">{stripHtml(post.title.rendered)}</h2>
                  <time className="post-date">{formatDate(post.date)}</time>
                </div>
                {post.excerpt && !expanded && (
                  <div className="post-excerpt">
                    {stripHtml(post.excerpt.rendered)}
                  </div>
                )}
                {expanded && post.content && (
                  <div 
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content.rendered) }}
                  />
                )}
                <button
                  onClick={() => togglePost(post.id)}
                  className="post-toggle-button"
                >
                  {expanded ? 'Show Less' : 'Read More'}
                </button>
              </article>
            )
          })
        )}
      </div>
    </div>
  )
}

export default PostsList

