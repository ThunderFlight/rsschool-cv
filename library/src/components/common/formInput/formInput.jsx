import React from "react";

export const FormInput = ({
  name,
  pattern,
  register,
  id,
  label,
  width,
  errors,
  type,
  value,
  onChange,
  checked,
}) => {
  return (
    <>
      {type === "text" ? (
        <>
          <label htmlFor={id}>{label}</label>
          <input
            style={{ width: width }}
            id={id}
            {...register(name, { pattern })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </>
      ) : (
        <>
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={(e) => onChange(e)}
            checked={checked === value ? true : false}
          />
          <label htmlFor={id}>{label}</label>
        </>
      )}
    </>
  );
};
