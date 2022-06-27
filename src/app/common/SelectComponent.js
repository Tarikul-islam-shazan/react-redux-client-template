import React from 'react';
import Select from 'react-select'

const SelectComponent = ({ options, onChange, selectedItem, placeholder, onBlur }) => {
    return <Select
        options={options}
        onChange={onChange}
        value = {selectedItem}
        placeholder={placeholder}
        onBlur={onBlur}
        className='react-select-container'
        classNamePrefix='react-select'
    />
}

export default SelectComponent
