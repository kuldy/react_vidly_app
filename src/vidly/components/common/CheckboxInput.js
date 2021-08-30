import React from "react";

const CheckboxInput = ({
  label,
  type = "checkbox",
  name,
  checked,
  onChange,
}) => {
  return (
    <div className="my-2">
      <label>
        {label}{" "}
        <input
          type={type} // target.checked instead of target.value
          name={name}
          checked={checked}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default CheckboxInput;
