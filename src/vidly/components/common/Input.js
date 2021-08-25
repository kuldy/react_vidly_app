import React from "react";

const Input = (props) => {
  const { name, label, value, onChange, error } = props;
  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <input
        // ref={ref}
        name={name}
        value={value}
        onChange={onChange}
        autoFocus
        type="text"
        className="form-control"
        id={name}
      />
      <div className="aler alert-danger">{error}</div>
    </div>
  );
};

export default Input;
