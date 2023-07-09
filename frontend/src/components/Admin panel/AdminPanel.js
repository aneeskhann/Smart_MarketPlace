import React, { useEffect, useState } from "react";
import { deleteUser, fetchUsers } from "../../api/userApi";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers()
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getUsers();
  }, []);

  const handleRemoveUser = async (userId) => {
    try{
      await deleteUser(userId)
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
    }catch(error){
      console.error("Error removing user:", error)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">Admin Panel</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">id</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{user._id}</td>
              <td className="py-2 px-4 border-b text-center">
                {user.username}
              </td>
              <td className="py-2 px-4 border-b text-center">{user.email}</td>
              <td className="py-2 px-4 border-b text-left">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleRemoveUser(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "fit-content",
                    margin: "0 auto",
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
