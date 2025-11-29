import { useState } from 'react'
import StudentInfo from './components/StudentInfo'
import PostsList from './components/PostsList'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('students')

  return (
    <div className="app">
      <main className="app-main">
        {currentPage === 'students' ? (
          <StudentInfo onProceed={() => setCurrentPage('posts')} />
        ) : (
          <PostsList onBack={() => setCurrentPage('students')} />
        )}
      </main>
    </div>
  )
}

export default App

