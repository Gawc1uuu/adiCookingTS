import React from "react";

interface PaginationButtonsProps {
  onChangePage: {
    handleNextPage: () => void;
    handlePrevPage: () => void;
    totalPages: any;
    currentPage: any;
  };
}

const PaginationButton = ({ onChangePage }: PaginationButtonsProps) => {
  return (
    <div className="container mx-auto text-center my-10 ">
      {/* Display pagination buttons here */}
      <button
        className="bg-white text-gray-800 rounded-l-md border-r border-navpink py-2 hover:bg-navpink hover:text-white px-3 dark:bg-gray-500 dark:text-white dark:hover:bg-white dark:hover:text-gray-700 dark:hover:cursor-pointer"
        onClick={onChangePage.handlePrevPage}
        disabled={onChangePage.currentPage === 1}
      >
        Previous
      </button>
      <button
        className="bg-white text-gray-800 rounded-r-md py-2 border-l border-navpink hover:bg-navpink hover:text-white px-3 dark:bg-gray-500 dark:text-white dark:hover:bg-white dark:hover:text-gray-700 dark:hover:cursor-pointer"
        onClick={onChangePage.handleNextPage}
        disabled={onChangePage.currentPage === onChangePage.totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButton;
