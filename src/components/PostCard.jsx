import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="block max-w-md mx-auto rounded-xl bg-gray-100 dark:bg-gray-800 p-4 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition transform hover:-translate-y-1"
      tabIndex={0} 
    >
      <div className="w-full mb-4 overflow-hidden rounded-xl">
        <img
          src={appwriteService.getFileView(featuredImage)}
          alt={title}
          className="w-full h-48 object-cover rounded-xl"
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate" title={title}>
        {title}
      </h2>
    </Link>
  );
}

export default PostCard;
