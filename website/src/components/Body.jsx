import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";

export default function Body() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-400 dark:text-gray-300">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center py-10 text-red-500 dark:text-red-400">
        {error}
      </p>
    );

  return (
    <div className="w-full min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Posts</h1>

      <div className="space-y-8">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="flex flex-col md:flex-row bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 h-80" // fixed height
          >
            {/* Image */}
            {post.media && (
              <img
                src={`http://127.0.0.1:8000/storage/${post.media.file_path}`}
                alt={post.title}
                className="w-full md:w-1/3 h-80 object-cover" // fixed height
              />
            )}

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between h-80">
              <div>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-300 mb-4 line-clamp-4">
                  {post.content}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-all duration-300 text-sm">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
