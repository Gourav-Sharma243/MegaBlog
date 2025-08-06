import { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';
import { Query } from "appwrite";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Get only active posts from all users
    appwriteService.getPosts([Query.equal("status", "active")]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              All Posts
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Discover amazing content from our community • {posts.length} active {posts.length === 1 ? 'post' : 'posts'}
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0V2m0 4h6m4 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2H5" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Posts Available
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Be the first to share something amazing with the community!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <div key={post.$id} className="transform hover:scale-105 transition-transform duration-200">
                <PostCard {...post} userId={post.userId} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
