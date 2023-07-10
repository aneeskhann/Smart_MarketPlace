import React from "react";
import { deleteUser } from "../../../api/userApi";

const DeleteUser = ({users, getUsers }) => {

  const handleRemoveUser = async (userId) => {
    try {
      await deleteUser(userId)
      getUsers()
    } catch (error) {
      console.error("Error removing user:", error)
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Delete Users</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
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

export default DeleteUser;
