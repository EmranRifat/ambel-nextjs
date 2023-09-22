import React from 'react';

export const InputField = ({ handleChange, userData, name, placeholder, type, ...rest }) => {

  return <div className="my-2">
    <input
      onChange={handleChange}
      value={userData[name] || ""}
      name={name}
      placeholder={placeholder}
      type={type}
      maxLength={100}
      className="form-control
    appearance-none rounded relative block w-full px-3 font-base py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 sm:text-sm"
      {...rest}
    />

  </div>
}

export const InputAreaField = ({ handleChange, userData, name, placeholder, ...rest }) => {
  return <div className="my-2">
    <textarea
      onChange={handleChange}
      value={userData[name] || ""}
      placeholder={placeholder}
      maxLength={250}
      name={name}
      className="form-control
    appearance-none rounded relative block w-full px-3 font-base py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 sm:text-sm"
      {...rest}
    />
  </div>
}

export const SelectOption = ({ handleChange, userData, name, placeholder, values, ...rest }) => {
  return <div className="my-2">
    <select
      onChange={handleChange}
      name={name}
      // defaultValue={"Select"}
      className="form-control
       appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  font-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 focus:z-10 sm:text-sm"
      {...rest}
    >
      <option
        selected={userData[name] ? false : true}
        disabled
        hidden
        value={null}>
        {placeholder}
      </option>
      {values.map((value, i) => (
        <option value={value} defaultValue={userData[name]} key={i}>{value}</option>
      ))}
    </select>
  </div>
}