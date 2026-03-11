import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import FAB from './components/FAB'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.theme)

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-500'>
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
      <FAB />
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-background-light dark:bg-background-dark">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pastel-coral mx-auto mb-4"></div>
        <p className="text-charcoal-light dark:text-gray-300 text-lg font-medium">Loading MegaBlog...</p>
      </div>
    </div>
  )
}

export default App