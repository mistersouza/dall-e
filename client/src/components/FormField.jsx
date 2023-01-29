import React from 'react'

const FormField = ({ 
  label, 
  type, 
  name, 
  placeholder, 
  value, 
  handleChange, 
  isSurpriseMe, 
  handleSurpriseMeClick
}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label 
          htmlFor={name}
          className='block text-sm font-medium text-gray-900'
        >
          {label}
        </label>
        {isSurpriseMe && (
            <button
              className='font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black'
              type='button'
              onClick={handleSurpriseMeClick}
            >
              Surprise me
            </button>
          )}
      </div>
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block w-full p-3'
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required
      />
    </div>
  )
}

export default FormField