import React from 'react'

function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors'>
      {children}
    </div>
  )
}

export default Container