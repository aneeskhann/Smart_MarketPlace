import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"; // Use environment variable for base URL

// Fetch all users with token authentication
export const fetchUsers = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return user data
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    throw new Error("Failed to fetch users");
  }
};

// Delete a user by ID
export const deleteUser = async (userId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authorization
      },
    });
    console.log("User deleted successfully:", response.data);
    return response.data; // Return confirmation or deleted user data
  } catch (error) {
    console.error("Error deleting user:", error.response?.data || error.message);
    throw new Error("Failed to delete user");
  }
};

// Update user details by ID
export const updateUser = async (userId, formData, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/user/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authorization
        "Content-Type": "application/json",
      },
    });
    console.log("User updated successfully:", response.data);
    return response.data; // Return updated user data
  } catch (error) {
    console.error("Error updating user:", error.response?.data || error.message);
    throw new Error("Failed to update user");
  }
};

// Add a new user
export const addUser = async (formData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authorization
        "Content-Type": "application/json",
      },
    });
    console.log("User added successfully:", response.data);
    return response.data; // Return added user data
  } catch (error) {
    console.error("Error adding user:", error.response?.data || error.message);
    throw new Error("Failed to add user");
  }
};

export const getUserDetails = async (userId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authorization
        "Content-Type": "application/json",
      },
    });
    console.log("User details fetched successfully:", response.data);
    return response.data; // Assuming the response contains the user details, including `role`
  } catch (error) {
    console.error("Error fetching user details:", error.response?.data || error.message);
    throw new Error("Failed to fetch user details");
  }
};



