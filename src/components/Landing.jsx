import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
    const authStatus = useSelector((state) => state.auth.status);

    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            <section className="relative overflow-hidden pt-20 pb-32 bg-gradient-to-br from-orange-50 via-white to-teal-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-teal-600/5 dark:from-orange-600/10 dark:to-teal-600/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 transition-colors">
                            Welcome to{' '}
                            <span className="bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
                                MegaBlog
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Share your thoughts, stories, and ideas with the world. Create beautiful blog posts with our powerful editor and reach readers everywhere.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {authStatus ? (
                                <>
                                    <Link
                                        to="/all-posts"
                                        className="px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 dark:hover:bg-orange-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                    >
                                        View All Posts
                                    </Link>
                                    <Link
                                        to="/add-post"
                                        className="px-8 py-4 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 border-2 border-orange-600 dark:border-orange-400 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-200"
                                    >
                                        Create New Post
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/signup"
                                        className="px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 dark:hover:bg-orange-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                    >
                                        Get Started Free
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="px-8 py-4 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 border-2 border-orange-600 dark:border-orange-400 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-200"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white dark:bg-gray-800 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors">
                            Everything you need to blog
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors">
                            Powerful features to help you create, manage, and share your content with ease.
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap -mx-4 justify-center">
                        <div className="p-4 w-full sm:w-1/2 lg:w-1/3">
                            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-600 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full">
                                <div className="w-16 h-16 bg-orange-600 dark:bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Rich Text Editor</h3>
                                <p className="text-gray-600 dark:text-gray-300 transition-colors">
                                    Create beautiful content with our powerful TinyMCE editor. Format text, add images, and more.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 w-full sm:w-1/2 lg:w-1/3">
                            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-gray-700 dark:to-gray-600 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full">
                                <div className="w-16 h-16 bg-teal-600 dark:bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Image Upload</h3>
                                <p className="text-gray-600 dark:text-gray-300 transition-colors">
                                    Upload and manage featured images for your posts with secure cloud storage.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 w-full sm:w-1/2 lg:w-1/3">
                            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-gray-700 dark:to-gray-600 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full">
                                <div className="w-16 h-16 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Secure Auth</h3>
                                <p className="text-gray-600 dark:text-gray-300 transition-colors">
                                    Safe and secure user authentication powered by Appwrite backend services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-orange-600 to-teal-600 dark:from-orange-700 dark:to-teal-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap -mx-4 justify-center">
                        <div className="p-4 w-full sm:w-1/2 lg:w-1/3 text-center">
                            <div className="transform hover:scale-110 transition-all duration-300 cursor-pointer">
                                <div className="text-5xl font-extrabold mb-4 text-white">∞</div>
                                <div className="text-xl font-semibold text-white">Unlimited Posts</div>
                            </div>
                        </div>
                        <div className="p-4 w-full sm:w-1/2 lg:w-1/3 text-center">
                            <div className="transform hover:scale-110 transition-all duration-300 cursor-pointer">
                                <div className="text-5xl font-extrabold mb-4 text-white">🚀</div>
                                <div className="text-xl font-semibold text-white">Lightning Fast</div>
                            </div>
                        </div>
                        <div className="p-4 w-full sm:w-1/2 lg:w-1/3 text-center">
                            <div className="transform hover:scale-110 transition-all duration-300 cursor-pointer">
                                <div className="text-5xl font-extrabold mb-4 text-white">📱</div>
                                <div className="text-xl font-semibold text-white">Fully Responsive</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Landing;