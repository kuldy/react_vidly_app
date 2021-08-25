import { faColumns } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import {
  FaSortUp,
  FaSortDown,
  FaSortAmountUpAlt,
  FaSortAmountUp,
} from "react-icons/fa";
//column
//sortColumn
//onSort

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path == path) {
      sortColumn.order = sortColumn.order == "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (!column.path) return null;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <FaSortAmountUpAlt />;
    return <FaSortAmountUp />;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              style={column.path ? { cursor: "pointer" } : {}}
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
