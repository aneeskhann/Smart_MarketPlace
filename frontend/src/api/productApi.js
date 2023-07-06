import axios from 'axios'

const url= "https://wish-attire.onrender.com"

export const postProduct= async (formData)=>{
  try{
     await axios.post(`${url}/product`,formData)
    
  }catch(error){
    console.error(error)
  }
}

export const getProducts = async () => {
  try {
    const response = await axios.get(`${url}/product`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};