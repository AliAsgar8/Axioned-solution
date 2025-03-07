import React from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPage }) => {
  return (
    <div className="flex flex-col gap-8 sm:flex-row justify-center items-center space-x-2 mt-6">
      <div className="flex gap-4">

        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm md:text-base rounded-full shadow-md transition-all duration-300
        ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}
        `}
        >
          ⏮ First
        </button>

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm md:text-base rounded-full shadow-md transition-all duration-300
        ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}
        `}
        >
          ◀ Previous
        </button>
      </div>

      <span className="px-6 py-2 text-sm md:text-base font-semibold bg-gray-100 text-gray-700 rounded-lg shadow">
        Page {currentPage} of {totalPage}
      </span>

      <div className="flex gap-4">

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPage}
          className={`px-4 py-2 text-sm md:text-base rounded-full shadow-md transition-all duration-300
        ${currentPage === totalPage ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}
        `}
        >
          Next ▶
        </button>

        <button
          onClick={() => setCurrentPage(totalPage)}
          disabled={currentPage === totalPage}
          className={`px-4 py-2 text-sm md:text-base rounded-full shadow-md transition-all duration-300
        ${currentPage === totalPage ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}
        `}
        >
          ⏭ Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;
