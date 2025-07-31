import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container } from '../components'

function Profile() {
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()

    // Get user initials for avatar
    const getInitials = (name) => {
        if (!name) return 'U'
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    // Format join date
    const formatJoinDate = (dateString) => {
        if (!dateString) return 'Unknown'
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        } catch (error) {
            return 'Unknown'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        {/* Cover Section */}
                        <div className="h-32 bg-gradient-to-r from-orange-600 to-teal-600"></div>
                        
                        {/* Profile Info */}
                        <div className="relative px-6 pb-6">
                            {/* Avatar */}
                            <div className="absolute -top-16 left-6">
                                <div className="w-32 h-32 bg-gradient-to-r from-orange-600 to-teal-600 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-gray-800 shadow-lg">
                                    {getInitials(userData?.name)}
                                </div>
                            </div>
                            
                            {/* User Details */}
                            <div className="pt-20">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                            {userData?.name || 'User Name'}
                                        </h1>
                                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                                            {userData?.email || 'user@example.com'}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-4 sm:mt-0">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 0h12l-1 12H5L4 7m5 4l3 3m0 0l3-3m-3 3V8" />
                                            </svg>
                                            <span>Member since {formatJoinDate(userData?.$createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        {/* Account Information */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Account Information
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Full Name
                                    </label>
                                    <p className="text-gray-900 dark:text-white text-lg">
                                        {userData?.name || 'Not provided'}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Email Address
                                    </label>
                                    <p className="text-gray-900 dark:text-white text-lg">
                                        {userData?.email || 'Not provided'}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        User ID
                                    </label>
                                    <p className="text-gray-900 dark:text-white text-sm font-mono bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
                                        {userData?.$id || 'Not available'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Account Status */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Account Status
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Email Verification
                                    </label>
                                    <div className="flex items-center mt-1">
                                        {userData?.emailVerification ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Pending
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Account Created
                                    </label>
                                    <p className="text-gray-900 dark:text-white text-lg">
                                        {formatJoinDate(userData?.$createdAt)}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Last Updated
                                    </label>
                                    <p className="text-gray-900 dark:text-white text-lg">
                                        {formatJoinDate(userData?.$updatedAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mt-8">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Quick Actions
                        </h2>
                        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <button
                                onClick={() => navigate('/add-post')}
                                className="flex items-center justify-center p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="font-medium text-orange-700 dark:text-orange-300">Create New Post</span>
                            </button>
                            
                            <button
                                onClick={() => navigate('/all-posts')}
                                className="flex items-center justify-center p-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0V2m0 4h6m4 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2H5" />
                                </svg>
                                <span className="font-medium text-teal-700 dark:text-teal-300">View My Posts</span>
                            </button>
                            
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="font-medium text-gray-700 dark:text-gray-300">Go to Home</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Profile