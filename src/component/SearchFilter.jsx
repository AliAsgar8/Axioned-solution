import React, { useState } from 'react';

const SearchFilter = ({ products, setFilterProducts, setCurrentPage }) => {
    const [search, setSearch] = useState("");
 

    const handleSearch = (e) => {
        setSearch(e.target.value);

        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            product.description.toLowerCase().includes(e.target.value.toLowerCase())
        );

        setFilterProducts(filtered);
      setCurrentPage(1)
    };

    return (
        <div className="flex flex-col md:flex-row justify-between">
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearch}
                className="w-full lg:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
         
        </div>
    );
};

export default SearchFilter;
