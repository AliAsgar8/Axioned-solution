import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ selectedProduct, onClick }) => {
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true); 

  useEffect(() => {
    if (selectedProduct) {
      setLoading(true);
      setImageLoading(true); 
      setTimeout(() => setLoading(false), 1000); 
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md px-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg md:w-xl relative transform scale-100 transition-transform duration-300">
        {/* Close Button */}
        <button
          onClick={onClick}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl z-20"
        >
          <FaTimes />
        </button>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Product Image with Loading Effect */}
            <div className="w-full flex justify-center mb-4 relative">
              {imageLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-200 rounded-lg">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                </div>
              )}

              <img
                src={selectedProduct.images?.[0] || "https://via.placeholder.com/300"}
                alt={selectedProduct.title}
                className={`w-full h-64 object-cover rounded-lg shadow-md transition-opacity duration-500 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setImageLoading(false)} 
              />
            </div>

            {/* Product Details */}
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {selectedProduct.title}
            </h2>

            {/* Category & Price */}
            <p className="text-gray-500 text-sm text-center mt-1">
              Category:{" "}
              <span className="font-semibold">{selectedProduct.category}</span>
            </p>
            <p className="text-green-600 text-xl font-semibold text-center mt-2">
              ${selectedProduct.price}
            </p>

            {/* Description */}
            <p className="text-gray-700 mt-4 text-center leading-relaxed text-sm md:text-base px-2">
              {selectedProduct.description}
            </p>

            {/* Close Button */}
            <div className="flex justify-center mt-5">
              <button
                onClick={onClick}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
