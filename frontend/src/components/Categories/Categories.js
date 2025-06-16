import React, { useEffect, useState } from "react";
import FeatureCard from "../FeatureCard/FeatureCard";
import Loading from "../Loaders/Loading";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:8000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again later.");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div><Loading/></div>;
  if (error) return <div className="text-center text-red-500 mt-10 mb-16">{error}</div>;
  if (categories.length === 0) return <div className="text-center text-gray-500 mt-10">No categories available.</div>;

  return (
    <div>
      <FeatureCard cards={categories} />
    </div>
  );
};

export default Categories;
