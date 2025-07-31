import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Error Icon */}
        <div className="mb-8">
          <svg 
            className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.76 0L4.054 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {error?.statusText || error?.message || "The page you're looking for doesn't exist or there was an error loading it."}
        </p>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-teal-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && error && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Debug Information:
            </h3>
            <pre className="text-xs text-gray-600 dark:text-gray-300 overflow-auto">
              {error.stack}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;
