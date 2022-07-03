import React from 'react';
import { ReactComponent as IconFavourite } from '../../assets/icons/favourite.svg';
import { ReactComponent as Favourite } from '../../assets/icons/favouriteIcon.svg';
import { ReactComponent as IconRightArrow } from '../../assets/icons/blackRightArrow.svg';

const MaterialBasedProduct = ({ product }) => {

    const renderProductImage = () => {
        if (product?.designDocuments.length > 0) {
            return (
                <img
                    className='w-full h-full object-cover'
                    src={product.designDocuments[0]?.docUrl}
                    alt='material-based-style'
                />
            )
        } else {
            return (
                <img
                    className='w-full h-full object-cover'
                    src='/images/defaultProduct.svg'
                    alt='material-based-style'
                />
            )
        }
    }

    return (
        <div className='collection-box'>
            <div className='overflow-hidden relative h-[300px] sm:h-[330px] 5xl:h-[456px] p-4 bg-white'>
                <div className='h-full'>
                    {renderProductImage()}
                </div>
                <div
                    className='w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer'>
                    <span className='mt-2'>
                        {product?.liked && <IconFavourite/>}
                        {!product?.liked && <Favourite/>}
                    </span>
                </div>
            </div>
            <div className='py-4'>
                <h4 className='text-xl font-bold text-primaryColor mb-3'>
                    {product?.name}
                </h4>
                <div className='flex  items-center gap-6 text-base text-primaryColor-shade-100 cursor-pointer'>
                    <span>View Collection</span>
                    <span>
                        <IconRightArrow/>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MaterialBasedProduct
