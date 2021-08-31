import React from "react";

const HttpApp = () => {
  return (
    <div className="my-2">
      <button className="btn btn-primary">Add</button>
      <table className="table">
        <thead>
          <tr>
            <th>{"Title"}</th>
            <th>{"Update"}</th>
            <th>{"Delete"}</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default HttpApp;
