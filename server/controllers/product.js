import { products } from "../model/products.js";


const getProducts=(req,res)=>{
  res.json(products);
  res.end()
}


export {
  getProducts
}