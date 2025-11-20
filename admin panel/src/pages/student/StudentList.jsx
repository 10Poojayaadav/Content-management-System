import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
  togglePublish,
} from "../../store/slices/pageSlice";

createTheme("light", {
  text: { primary: "#1E1E1E", secondary: "#2E2E2E" },
  background: { default: "#FFFFFF" },
  divider: { default: "#E0E0E0" },
});

createTheme("dark", {
  text: { primary: "#FFFFFF", secondary: "#A0A0A0" },
  background: { default: "#1E1E2F" },
  divider: { default: "#4A4A4A" },
});

const StudentList = () => {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.pages.items || []); // assuming pages slice has items
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPage, setNewPage] = useState({ title: "", content: "" });

  // Dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Fetch pages from Redux
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPage = () => {
    dispatch(addPost(newPage));
    setIsModalOpen(false);
    setNewPage({ title: "", content: "" });
  };

  const handleEditPage = () => {
    dispatch(updatePost({ id: selectedPage.id, ...newPage }));
    setIsModalOpen(false);
    setSelectedPage(null);
    setNewPage({ title: "", content: "" });
  };

  const handleDeletePage = (id) => {
    dispatch(deletePost(id));
  };

  const filteredData = pages.filter(
    (page) =>
      page.title && page.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Title", selector: (row) => row?.title, sortable: true },
    { name: "Content", selector: (row) => row?.content },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedPage(row);
              setNewPage({ title: row.title, content: row.content });
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeletePage(row.id)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 h-screen bg-[#f0efef] dark:bg-gray-600 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Pages</h1>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Filter by Title"
          className="border p-2 rounded w-full sm:w-1/3"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button
          onClick={() => {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reset
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Page
        </button>
      </div>

      <DataTable
        title="Page Data"
        columns={columns}
        data={filteredData}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        highlightOnHover
        striped
        theme={isDarkMode ? "dark" : "light"}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {selectedPage ? "Edit Page" : "Add New Page"}
            </h2>

            <div className="mb-4">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newPage.title}
                onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Content</label>
              <textarea
                className="w-full p-2 border rounded"
                value={newPage.content}
                onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={selectedPage ? handleEditPage : handleAddPage}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {selectedPage ? "Save Changes" : "Add Page"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
