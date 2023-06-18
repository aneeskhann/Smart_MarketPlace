import axios from 'axios'

export const postProduct= async (formData)=>{
  try{
     await axios.post("http://localhost:5000/product",formData)
    
  }catch(error){
    console.error(error)
  }
}