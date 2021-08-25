import React from "react";
import _, { map } from "lodash";
import PropTypes from "prop-types";

function Pagination(props) {
  const { itemsCounts, pageSize, onPageChange, currentPage } = props;

  const totalPages = Math.ceil(itemsCounts / pageSize);

  if (totalPages === 1) return null;

  const pages = _.range(1, totalPages + 1);

  return (
    <nav aria-label="here goes a msg for screen readers">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  itemsCounts: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
