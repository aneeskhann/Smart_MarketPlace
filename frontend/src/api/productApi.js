import axios from 'axios'

const url= "http://localhost:5000"

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

export const getProductById= async (id)=>{
  try{
    const item =await axios.get(url+'/product/'+id);
    console.log(item)
    return item.data;
  }catch(e){
    console.log(e)
  }
  
}