import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, userId }) {
    const authorName = appwriteService.getUserName(userId);
    const cardKey = `${$id}-${userId}`;
    
    return (
        <Link to={`/post/${$id}`} key={cardKey}>
            <div className='w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700'>
                <div className='w-full justify-center mb-4 overflow-hidden rounded-lg'>
                    <img 
                        src={appwriteService.getFileView(featuredImage)} 
                        alt={title}
                        className='w-full h-48 object-cover transition-transform duration-300 hover:scale-110'
                    />
                </div>
                
                <h2 className='text-xl font-bold text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors line-clamp-2 mb-2'>
                    {title}
                </h2>
                
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                    by {authorName}
                </p>
            </div>
        </Link>
    )
}

export default PostCard