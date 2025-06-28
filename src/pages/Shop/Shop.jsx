import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { motion } from "framer-motion";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/shop/getproducts/");
        setProducts(response.data);
        console.log("Products", response.data);
      } catch (error) {
        console.error("Error fetching shop data:", error);
        setError("Failed to load shop data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-error p-6">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="p-4 bg-base-100 rounded min-h-screen w-full max-w-6xl mx-auto"
    >
      <h1 className="text-4xl font-bold mb-8" role="heading" aria-level="1">
        Shop
      </h1>
    </motion.div>
  );
};

export default Shop;
