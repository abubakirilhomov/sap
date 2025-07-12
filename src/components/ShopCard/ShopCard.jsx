import React from "react";
import { motion } from "framer-motion";
import { BsFillLightningChargeFill } from "react-icons/bs";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShopCard = ({ product }) => {
  const stock = product.quantity;
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  let badgeText = "";
  let badgeClass = "";
  if (isOutOfStock) {
    badgeText = "Out of Stock";
    badgeClass = "badge-error";
  } else if (isLowStock) {
    badgeText = "Low Stock";
    badgeClass = "badge-warning";
  } else {
    badgeText = "In Stock";
    badgeClass = "badge-success";
  }

  let textColorClass = "";
  if (isOutOfStock) {
    textColorClass = "text-error";
  } else if (isLowStock) {
    textColorClass = "text-warning";
  } else {
    textColorClass = "text-success";
  }

  const handleBuy = async () => {
    if (isOutOfStock) return;

    try {
      const response = await axiosInstance.post("/api/v1/shop/buyproduct/", {
        product_id: product.id,
      });
      toast.success("Purchase successful!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Optionally update stock or refresh products here (e.g., subtract 1 from stock)
      // This would require a state update or re-fetch from the parent component
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Failed to purchase. Please try again.";
      console.error("Error buying product:", error);
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <motion.div
      key={product.id}
      className="bg-base-200 relative p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className={`mb-2 ${textColorClass}`}>
        Stock: {stock}
      </p>
      <div className={`badge ${badgeClass} absolute top-5 left-5 mb-2`} role="status">
        <span className="font-semibold">{badgeText}</span>
      </div>
      <p className="text-lg font-bold text-primary flex items-center">
        <BsFillLightningChargeFill className="text-xl text-amber-500" /> {product.cost}
      </p>
      <button
        className={`btn btn-sm w-full mt-5 ${isOutOfStock ? "btn-disabled" : "btn-success"}`}
        disabled={isOutOfStock}
        onClick={handleBuy}
      >
        {isOutOfStock ? "Out of Stock" : "Buy"}
      </button>
    </motion.div>
  );
};

export default ShopCard;