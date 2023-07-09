import axios from "axios";

const url= "http://localhost:5000"

export const fetchUsers = async () => {
  try{
    const response= await axios.get(`${url}/api/user`)
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