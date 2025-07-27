import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (!post) return;
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        if (post.featuredImage) {
          appwriteService.deleteFile(post.featuredImage);
        }
        navigate("/");
      }
    });
  };

  if (!post) return null;

  return (
    <div className="py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Container>
        <div className="w-full max-w-4xl mx-auto">
          {/* Image with buttons for author */}
          <div className="relative mb-6 rounded-xl border border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow-md">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-xl w-full h-auto object-cover"
            />

            {isAuthor && (
              <div className="absolute right-4 top-4 flex space-x-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-500 hover:bg-green-600"
                    className="text-white px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500 hover:bg-red-600"
                  onClick={deletePost}
                  className="text-white px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Post title */}
          <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
            {post.title}
          </h1>

          {/* Post content inside a styled box */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <article className="prose max-w-none prose-lg dark:prose-invert dark:text-gray-100 text-gray-800">
              {parse(post.content)}
            </article>
          </div>
        </div>
      </Container>
    </div>
  );
}
