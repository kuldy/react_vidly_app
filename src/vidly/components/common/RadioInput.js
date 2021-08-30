import React from "react";

const RadioInput = ({
  type = "radio",
  label,
  name,
  value,
  checked,
  onChange,
  ...rest
}) => {
  return (
    <label className="me-2">
      {label}{" "}
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
    </label>
  );
};

export default RadioInput;
