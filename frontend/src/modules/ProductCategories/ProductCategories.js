import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Products from '../../components/Products/Products';
import Loading from '../../components/Loaders/Loading';
import axios from 'axios';

const ProductCategories = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:8000/api/categories/${name}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products by category:", error);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchProducts();
    }
  }, [name]);

  if (loading) return <div><Loading/></div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (products.length === 0) return <div className="text-center text-gray-500 ">No products found in this category.</div>;

  return (
    <div>
      <Products products={products}/>
    </div>
  );
};

export default ProductCategories;


