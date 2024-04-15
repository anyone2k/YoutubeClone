import React from 'react'

const Input = (props) => {
  return (
    <>
       <input 
        type = {props.type}
        className="form-control"  
        name= {props.name} 
        value={props.email} 
        placeholder={props.placeholder} 
        onChange={props.onChange} 
        />
    </>
  )
}

export default Input