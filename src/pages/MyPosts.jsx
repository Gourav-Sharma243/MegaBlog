import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';
import { Query } from "appwrite";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector(state => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.$id) {
      // Get posts only for the current user
      appwriteService.getPosts([
        Query.equal("status", "active"),
        Query.equal("userId", userData.$id)
      ]).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
        setLoading(false);
      }).catch((error) => {
        console.log("Error fetching user posts:", error);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [userData]);

  if (loading) {
    return (
      <div className="w-full py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Container>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Loading your posts...</span>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            {/* Empty State Illustration */}
            <div className="mb-8">
              <svg className="w-32 h-32 mx-auto text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0V2m0 4h6m4 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2H5" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No Posts Yet!
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              You haven't created any posts yet. Share your thoughts, stories, and ideas with the world!
            </p>
            
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button
                onClick={() => navigate('/add-post')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-teal-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Post
              </button>
              
              <button
                onClick={() => navigate('/all-posts')}
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Explore All Posts
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                My Posts
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                You have created {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={() => navigate('/add-post')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-600 to-teal-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-teal-700 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Post
              </button>
              
              <button
                onClick={() => navigate('/all-posts')}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                View All Posts
              </button>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <div key={post.$id} className="transform hover:scale-105 transition-transform duration-200">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MyPosts;
