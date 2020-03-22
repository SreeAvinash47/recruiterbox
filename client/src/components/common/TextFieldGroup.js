import React, { Component } from 'react'

const TextFieldGroup =({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (<div>
        <input 
            type={type}
            className={''}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
        {info && <small>{info}</small>}
        {error && <div className=''>{error}</div>}
    </div>)
}
export default TextFieldGroup;