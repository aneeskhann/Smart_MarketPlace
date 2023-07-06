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