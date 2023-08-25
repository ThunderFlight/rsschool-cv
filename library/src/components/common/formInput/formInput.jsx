import React from "react"
export const FormInput = ({name, pattern, register, id, label, width, errors}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input style={{width:width}} id={id} {...register(name,{pattern})}/>
      {errors.name && <p>{errors.name.message}</p>}
    </>
    )
}