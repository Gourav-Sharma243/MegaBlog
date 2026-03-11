import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import { Card, CardContent } from "./ui/card"
import { motion } from "framer-motion"

function PostCard({ $id, title, featuredImage, userId }) {
    const authorName = appwriteService.getUserName(userId);
    const cardKey = `${$id}-${userId}`;
    
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <Link to={`/post/${$id}`} key={cardKey} className="group block h-full">
                <Card className="h-full overflow-hidden border border-gray-100/10 dark:border-white/5 bg-white/50 dark:bg-surface-dark/40 backdrop-blur-sm group-hover:bg-white dark:group-hover:bg-surface-dark/60 transition-all duration-500 rounded-3xl group-hover:shadow-[0_20px_50px_rgba(99,102,241,0.1)] dark:group-hover:shadow-[0_20px_50px_rgba(99,102,241,0.05)]">
                    <div className='relative aspect-[16/10] overflow-hidden'>
                        <img 
                            src={appwriteService.getFileView(featuredImage)} 
                            alt={title}
                            className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <CardContent className="p-6 flex flex-col h-[calc(100%-62.5%)]">
                        <h2 className='text-xl font-display font-semibold leading-tight text-text-light dark:text-text-dark group-hover:text-primary-dark transition-colors line-clamp-2 mb-4'>
                            {title}
                        </h2>
                        
                        <div className="mt-auto flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-dark/10 flex items-center justify-center text-primary-dark text-xs font-bold border border-primary-dark/20">
                               {authorName.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-text-light/60 dark:text-text-dark/60 group-hover:text-text-light dark:group-hover:text-text-dark transition-colors">
                                {authorName}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    )
}

export default PostCard