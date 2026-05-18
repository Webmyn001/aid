import React from 'react'

const Button = (props) => {
  return (
    <button className='mt-[25px] focus:outline-0 font-jost text-white py-1 px-5 hover:border-transparent hover:text-white text-center duration-300 hover:border-[1px] rounded-lg bg-[#d2ab66]'>
        {props.name}
    </button>
  )
}

export default Button