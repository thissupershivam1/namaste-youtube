import React from 'react'
import Button from './Button'

const ButtonList = () => {
  return (
    <div className='flex bg-[#0f0f0f]'>
        <Button name="ALL"/>
        <Button name="Gaming"/>
        <Button name="Web"/>
        <Button name="Coding"/>
        <Button name="Songs"/>
        
        
    </div>
  )
}

export default ButtonList