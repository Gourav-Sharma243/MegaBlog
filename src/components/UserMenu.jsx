import  { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { logout } from '../store/authSlice'

function UserMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const logoutHandler = async () => {
        try {
            await authService.logout()
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const getInitials = (name) => {
        if (!name) return 'U'
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
                <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {getInitials(userData?.name)}
                </div>
                
                <span className="text-gray-700 dark:text-gray-200 font-medium hidden sm:block">
                    {userData?.name || 'User'}
                </span>
                
                <svg 
                    className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {getInitials(userData?.name)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                    {userData?.name || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {userData?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="py-2">
                        <button
                            onClick={() => {
                                setIsOpen(false)
                                navigate('/all-posts')
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0V2m0 4h6m4 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2H5" />
                            </svg>
                            My Posts
                        </button>

                        <button
                            onClick={() => {
                                setIsOpen(false)
                                navigate('/add-post')
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Post
                        </button>

                        <button
                            onClick={() => {
                                setIsOpen(false)
                                navigate('/profile')
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile
                        </button>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                        <button
                            onClick={() => {
                                setIsOpen(false)
                                logoutHandler()
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu