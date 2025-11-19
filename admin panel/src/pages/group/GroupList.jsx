import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";


const fetchData = () => {
  return [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Sam Wilson", email: "sam@example.com", role: "Editor" },
  ];
};

const GroupList = () => {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    const result = fetchData();
    setData(result);
  }, []);


  const handleAddUser = () => {
    setData([...data, { ...newUser, id: data.length + 1 }]);
    setIsModalOpen(false); 
    setNewUser({ name: "", email: "", role: "" }); 
  };


  const handleEditUser = () => {
    const updatedData = data.map((user) =>
      user.id === selectedUser.id ? { ...user, ...newUser } : user
    );
    setData(updatedData);
    setIsModalOpen(false);
    setSelectedUser(null);
    setNewUser({ name: "", email: "", role: "" });
  };


  const handleDeleteUser = (id) => {
    setData(data.filter((user) => user.id !== id));
  };


  const filteredData = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );


  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedUser(row);
              setNewUser({ name: row.name, email: row.email, role: row.role });
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteUser(row.id)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Group Listing</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by Name"
          className="border p-2 rounded w-full sm:w-1/3"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button
          onClick={() => {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
          }}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reset
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Add User
        </button>
      </div>

      <DataTable
        title="User Data"
        columns={columns}
        data={filteredData}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        highlightOnHover
        striped
      />

    
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {selectedUser ? "Edit User" : "Add New User"}
            </h2>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Role</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
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
                onClick={selectedUser ? handleEditUser : handleAddUser}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {selectedUser ? "Save Changes" : "Add User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupList;
