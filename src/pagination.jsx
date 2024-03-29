import React from 'react';

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const goToNextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    }

    const goToPrevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    }

    return (
        <nav className="flex justify-center">
            <ul className="pagination flex space-x-2 mt-4">
                <li className="page-item">
                    <button 
                        className={`page-link px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-secondary text-white'}`}
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className={`page-item ${currentPage === pgNumber ? 'active' : ''}`}
                    >
                        <button 
                            onClick={() => setCurrentPage(pgNumber)}
                            className={`page-link px-4 py-2 rounded ${currentPage === pgNumber ? 'bg-secondary text-white' : 'bg-gray-300 text-gray-600'}`}
                        >
                            {pgNumber}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button 
                        className={`page-link px-4 py-2 rounded ${currentPage === nPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-secondary text-white'}`}
                        onClick={goToNextPage}
                        disabled={currentPage === nPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
