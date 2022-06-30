import React from 'react';

const GenerateTags = ({ tags }) => {

    const renderTags = () => {
        return tags.map(item => {
            return <span
                className={item?.text === 'New' ? 'badge bg-warning font-bold' : 'badge bg-success font-bold'}
                key={`tag_${item.id}`}
            >
                {item.text}
            </span>
        })
    }

    return renderTags();
}

export default GenerateTags
