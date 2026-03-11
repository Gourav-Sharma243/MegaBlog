import { Container, Logo } from '../index'
import UserMenu from '../UserMenu'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../store/themeSlice'
import { Sun, Moon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const theme = useSelector((state) => state.theme.theme)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 sm:py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-white/5 transition-colors sticky top-0 z-50'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto items-center space-x-1 sm:space-x-4 md:space-x-6'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className='px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-charcoal-light dark:text-gray-300 hover:text-pastel-teal dark:hover:text-pastel-teal rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 active:scale-95'
                >
                  {item.name}
                </button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <UserMenu />
              </li>
            )}
            <li>
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-2 sm:p-2.5 rounded-full text-charcoal-light dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 active:scale-90 flex items-center justify-center"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
              </button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header