import React from 'react';

const ImageGridComponent = ({ documentList, whiteOverLay }) => {

    const renderImageList = () => {
        return documentList?.map(item => {
            return <img
                key={`images_${item.id}`}
                className='w-full mb-1'
                alt='collectionImage'
                src={item.docUrl}
            />
        })
    }

    return (
        <div className={whiteOverLay ? 'image-grid-overlay-white' : 'image-grid-overlay'}>
            <div className='columns-3 gap-1'>
                {renderImageList()}
            </div>
        </div>
    )
}

export default ImageGridComponent
