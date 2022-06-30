import React from 'react';

const GenerateSolidColors = ({ colors }) => {

    const renderSolidColors = () => {
        return colors.map(item => {
            return <span
                key={`color_${item.id}`}
                className={'color-circle'}
                style={{ backgroundColor: item.hexCode }}
            />
        })
    }

    return renderSolidColors()
}

export default GenerateSolidColors
