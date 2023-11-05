import React from 'react'

const Button = ({name}) => {
  return (
    <div>
        <button className='px-5 py-2 m-2 text-white rounded-xl bg-[#3f3f3f]'>{name}</button>
    </div>
  )
}

export default Button