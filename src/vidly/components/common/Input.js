import React from "react";

const Input = (props) => {
  const { name, label, error, ...rest } = props;
  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <input
        // ref={ref}
        {...rest}
        name={name}
        autoFocus
        className="form-control"
        id={name}
      />
      <div className="aler alert-danger">{error}</div>
    </div>
  );
};

export default Input;
