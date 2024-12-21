import React, { useState } from "react";
import { updateUser } from "../../../api/userApi";

const ModifyUser = ({ users,getUsers }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, userId) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [userId]: { ...prevFormData[userId], [name]: value },
    }));
  };


  const handleUpdateUser = async (userId, formData) => {
    try {
      await updateUser(userId, formData);
      getUsers()
      alert("user updated successfully")
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Modify Users</h2>
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table header */}
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Table rows */}
          {users.map((user) => {
            const userFormData = formData[user._id] || {}; // Retrieve formData for specific user
            return (
              <tr key={user._id}>
                {/* ID column */}
                <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
                {/* Username column */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="username"
                    value={userFormData.username || user.username}
                    onChange={(e) => handleChange(e, user._id)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </td>
                {/* Email column */}
               
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="email"
                    value={userFormData.email || user.email}
                    onChange={(e) => handleChange(e, user._id)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </td>
                {/* Role column */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    name="role"
                    value={userFormData.role || user.role}
                    onChange={(e) => handleChange(e, user._id)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    
                    <option value="admin">Admin</option>
                    <option value="seller">Seller</option>
                    <option value="client">Client</option>
                  </select>
                </td>
                Update button column
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleUpdateUser(user._id, userFormData)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "fit-content",
                      margin: "0 auto",
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ModifyUser;
