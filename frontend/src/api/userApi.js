import axios from "axios";

const url= "http://localhost:5000"

export const fetchUsers = async (token) => {
  try{
    const response= await axios.get(`${url}/api/user`,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data
  }catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users");
  }
}

export const deleteUser = async (userId) => {
  try{
    const response = await axios.delete(`${url}/api/user/${userId}`)
    console.log(response.data)
  }catch(error){
    console.log(error)
    throw new Error("Failed to delete user")
  }
}

export const updateUser = async (userId, formData) => {
  try{
    const response = await axios.put(`${url}/api/user/${userId}`, formData)
    console.log(response.data)
  }catch(error){
    console.log(error)
    throw new Error("Failed to update user")
  }
}