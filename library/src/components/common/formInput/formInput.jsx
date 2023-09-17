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
  styles,
  maxLength
}) => {
  return (
    <>
      {type === "text" ? (
        <>
          <label htmlFor={id}>{label}</label>
          <input
            style={{ width: width }}
            id={id}
            pattern={pattern}
            maxLength={maxLength}
            {...register(name)}
          />
          {(errors && errors[name])&&(
            <p className={styles.required}>{errors[name]['message']}</p>
          )}
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
