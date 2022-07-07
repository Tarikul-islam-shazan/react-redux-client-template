import React from 'react'
import Select from 'react-select'

const SelectComponent = ({
    options,
    onChange,
    selectedItem,
    placeholder,
    onBlur,
    ref
}) => {
    //     console.log(options)
    return (
        <Select
            ref={ref}
            options={options}
            onChange={onChange}
            value={selectedItem}
            placeholder={placeholder}
            onBlur={onBlur}
            className='react-select-container'
            classNamePrefix='react-select'
            // menuIsOpen={true}
        />
    )
}

export default SelectComponent
