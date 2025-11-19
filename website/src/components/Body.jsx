import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";

export default function Body() {
  const dispatch = useDispatch();

  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p className="text-center py-10 text-gray-600 dark:text-gray-300">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 dark:bg-gray-900 dark:text-white">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Latest Posts
      </h1>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {posts?.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            {/* Image */}
            {post.media && (
              <img
                src={`http://127.0.0.1:8000/storage/${post.media.file_path}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {post.title}
              </h2>

              <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                {post.content}
              </p>

              <button
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-all duration-300"
              >
                Read More
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
