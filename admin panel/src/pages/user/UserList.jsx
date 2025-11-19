// src/components/PostList.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable, { createTheme } from "react-data-table-component";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
} from "../../store/slices/postSlice";

createTheme("light", {
  text: { primary: "#1E1E1E" },
  background: { default: "#FFFFFF" },
});

const UserList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.posts.items) || [];
  const loading = useSelector((state) => state.posts.loading);

  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image: null,
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddOrEditPost = () => {
    if (selectedPost) {
      dispatch(updatePost({ ...newPost, id: selectedPost.id }));
    } else {
      dispatch(addPost(newPost));
    }
    setIsModalOpen(false);
    setNewPost({ title: "", content: "", image: null });
    setSelectedPost(null);
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Content", selector: (row) => row.content, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedPost(row);
              setNewPost({
                title: row.title,
                content: row.content,
                image: null,
              });
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter Posts"
          className="border p-2 rounded"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Post
        </button>
      </div>

      <DataTable
        title="Posts Table"
        columns={columns}
        data={filteredData}
        pagination
        progressPending={loading}
        theme="light"
      />

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl mb-4">
              {selectedPost ? "Edit Post" : "Add Post"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded mb-4"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <textarea
              placeholder="Content"
              className="w-full p-2 border rounded mb-4"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
            />
            <input
              type="file"
              className="w-full mb-4"
              onChange={(e) =>
                setNewPost({ ...newPost, image: e.target.files[0] })
              }
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEditPost}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {selectedPost ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
