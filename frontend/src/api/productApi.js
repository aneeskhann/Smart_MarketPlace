import axios from 'axios'

export const postProduct= async (formData)=>{
  try{
     await axios.post("https://wish-attire.onrender.com/product",formData)
    
  }catch(error){
    console.error(error)
  }
}

export const getProducts= async (products)=>{
  try{
    const response = await axios.get(
      "https://wish-attire.onrender.com/product"
    );
    return response.data
  }catch(error){
    console.error(error)
  }
}