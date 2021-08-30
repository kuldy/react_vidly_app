import React from "react";
import PropTypes from "prop-types";
// const values = [
//   { _id: 1, name: "" },
//   { _id: 2, name: "One" },
//   { _id: 3, name: "Two" },
//   { _id: 4, name: "Three" },
// ];
const SelectInput = ({
  label,
  options,
  name,
  value,
  onChange,
  error,
  idProperty,
  nameProperty,
  ...rest
}) => {
  return (
    <div className="mb-3">
      <div>{label}</div>
      <select
        value={value}
        name={name}
        id={name}
        onChange={onChange}
        className="form-select"
        {...rest}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option[idProperty]} value={option[idProperty]}>
            {option[nameProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

SelectInput.defaultProps = {
  nameProperty: "name",
  idProperty: "_id",
};

export default SelectInput;
