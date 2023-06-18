import axios from 'axios'

export const postProduct= async (formData)=>{
  try{
     await axios.post("http://localhost:5000/product",formData)
    
  }catch(error){
    console.error(error)
  }
}

export const getProducts= async (products)=>{
  try{
    const response = await axios.get(
      "http://localhost:5000/product"
    );
    return response.data
  }catch(error){
    console.error(error)
  }
}