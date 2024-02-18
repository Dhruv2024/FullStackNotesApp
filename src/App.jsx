import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/common/Navbar'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import { VerifyAccount } from './pages/VerifyAccount'
import { Login } from './pages/Login'
import { Notes } from './pages/Notes'
import { PrivateRoute } from './components/core/Auth/PrivateRoute'
import { OpenRoute } from './components/core/Auth/OpenRoute'
import { NoteUpdate } from './components/core/ParticularNotePage/NoteUpdate'
// import { useEffect } from 'react'

function App() {
  // useEffect(() => {
  //   const handleContextmenu = e => {
  //     e.preventDefault()
  //   }
  //   document.addEventListener('contextmenu', handleContextmenu)
  //   return function cleanup() {
  //     document.removeEventListener('contextmenu', handleContextmenu)
  //   }

  // }, [])
  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />
        <Route path='/verify-email' element={
          <OpenRoute>
            <VerifyAccount />
          </OpenRoute>
        } />
        <Route path='/login' element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />
        <Route path='/dashboard/my-notes' element={
          <PrivateRoute>
            <Notes />
          </PrivateRoute>
        } />
        <Route path='/dashboard/notes/:id' element={
          <PrivateRoute>
            <NoteUpdate />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
