import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  // Show login prompt if not logged in or no posts available
  if (!authStatus || posts.length === 0) {
    return (
      <div className="w-full py-12 mt-4 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
        <Container>
          <div className="flex flex-wrap -mx-2 justify-center">
            <div className="p-2 w-full max-w-md text-center">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition cursor-default">
                Login to see all posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Otherwise, show posts normally
  return (
    <div className="w-full py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Container>
        <div className="flex flex-wrap -mx-2">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
