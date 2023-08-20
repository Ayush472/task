import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  prePage,
  nextPage,
  changePage,
}) => {
  return (
    <nav className="d-flex justify-content-center ">
      <ul className="pagination">
        <li className="page-item">
          <a
            className={
              "page-link bg-light border-dark " +
              (currentPage === 1 ? "disabled_link  " : "")
            }
            onClick={prePage}
          >
            Prev
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <li className="page-item" key={pageNumber}>
              <a
                className={
                  "page-link bg-light border-dark " +
                  (currentPage === pageNumber ? "active_link" : "")
                }
                onClick={() => changePage(pageNumber)}
              >
                {pageNumber}
              </a>
            </li>
          )
        )}
        <li className="page-item">
          <a
            className={
              "page-link bg-light border-dark " +
              (currentPage === totalPages ? "disabled_link" : "")
            }
            onClick={nextPage}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
