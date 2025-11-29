import './Navigation.css'

function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav className="navigation">
      <button
        className={`nav-button ${currentPage === 'students' ? 'active' : ''}`}
        onClick={() => setCurrentPage('students')}
      >
        Students
      </button>
      <button
        className={`nav-button ${currentPage === 'posts' ? 'active' : ''}`}
        onClick={() => setCurrentPage('posts')}
      >
        Posts
      </button>
    </nav>
  )
}

export default Navigation

