import axios from 'axios'

export const postProduct= async (product)=>{
  try{
    const response= await axios.post("http://localhost:5000/product",product)
    return response.data
  }catch(e){
    console.error(e)
  }
}