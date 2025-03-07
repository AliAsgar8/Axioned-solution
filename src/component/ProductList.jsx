import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import SearchFilter from "./SearchFilter";
import Modal from "./Modal";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilteredProducts] = useState([]);

    //Modal
    const [selectedProduct, setSelectedProduct] = useState(null);

    //  Loading State
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("");


    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); 
                const response = await axios.get("https://dummyjson.com/products?limit=150");
                setProducts(response.data.products);
                setFilteredProducts(response.data.products);
                setLoading(false); 
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false); 
            }
        };
        fetchProducts();
    }, []);

    const handleSort = (option) => {
        setSortOption(option);
        let sortedProducts = [...filterProducts];

        if (option === "id-asc") sortedProducts.sort((a, b) => a.id - b.id);
        if (option === "id-desc") sortedProducts.sort((a, b) => b.id - a.id);
        if (option === "title-asc") sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        if (option === "title-desc") sortedProducts.sort((a, b) => b.title.localeCompare(a.title));

        setFilteredProducts(sortedProducts);
    };


    //Pagination Logic
    const totalPage = Math.ceil(filterProducts.length / itemsPerPage);
    const paginationProducts = filterProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container mx-auto p-4">

            <div className="flex flex-wrap justify-between items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
                {/*  Search Component */}
                <div className="flex-grow min-w-[200px]">
                    <SearchFilter products={products} setFilterProducts={setFilteredProducts} />
                </div>

                {/* Sorting Dropdown */}
                <div className="flex items-center space-x-2">
                    <label className="font-semibold text-gray-800">Sort By:</label>
                    <select
                        className="border border-gray-300 p-2 rounded bg-white text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={sortOption}
                        onChange={(e) => handleSort(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="id-asc">ID (Ascending)</option>
                        <option value="id-desc">ID (Descending)</option>
                        <option value="title-asc">Title (A-Z)</option>
                        <option value="title-desc">Title (Z-A)</option>
                    </select>
                </div>
            </div>



            {/* ✅ Show Loader While Data is Loading */}
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
                </div>
            ) : (
                <>
                    {/* 🏷️ Product List */}
                    <div className="overflow-x-auto mt-4">
                        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
                            <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th className="py-3 px-4 border">ID</th>
                                    <th className="py-3 px-4 border">Title</th>
                                    <th className="py-3 px-4 border hidden md:table-cell">Description</th>
                                    <th className="py-3 px-4 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginationProducts.map((product) => (
                                    <tr key={product.id} className="text-center hover:bg-gray-300 transition bg-gray-200 ">
                                        <td className="py-3 px-4 border">{product.id}</td>
                                        <td className="py-3 px-4 border font-semibold">{product.title}</td>
                                        <td className="py-3 px-4 border hidden md:table-cell truncate max-w-xs ">{product.description}</td>
                                        <td className="py-3 px-4 border">
                                            <button
                                                onClick={() => setSelectedProduct(product)}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/*  Pagination Component */}
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />
                </>
            )}

            {/*  Product Modal */}
            {selectedProduct && <Modal selectedProduct={selectedProduct} onClick={() => setSelectedProduct(null)} />}
        </div>
    );
};

export default ProductList;
