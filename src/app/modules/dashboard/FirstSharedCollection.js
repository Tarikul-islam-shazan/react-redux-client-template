import React from 'react';
import ImageGridComponent from '../../common/ImageGridComponent';
import { ReactComponent as IconFavourite } from '../../../assets/icons/favourite.svg';
import { ReactComponent as Favourite } from '../../../assets/icons/favouriteIcon.svg';
import GenerateTags from '../../common/GenerateTags';
import GenerateSolidColors from '../../common/GenerateSolidColors';

const FirstSharedCollection = ({ collection }) => {

    return (
        <div className='xl:w-[70%] 4xl:w-4/5'>
            <div
                className='bg-primaryColor xl:h-[431px] p-4 pb-0 flex flex-col md:flex-row justify-between relative'>
                <div className='md:w-7/12 pt-16 p-5 md:pr-10 relative'>
                    <div className='flex gap-3'>
                        <GenerateTags tags={collection.tags}/>
                    </div>
                    <h1 className='text-4xl text-white-shade-100 font-bold mt-6 mb-8 leading-[54px] xl:ellipsis-2'>{collection?.name}</h1>
                    <div className='flex items-center text-base md:text-xl text-white-shade-100 gap-3 md:gap-5'>
                        <span>Designed by NITEX</span>
                        <span className='leading-none inline-block mb-2'>.</span>
                        {collection?.numOfDesign && <span>{collection?.numOfDesign} Styles</span>}
                    </div>
                    <div className='color-list flex gap-1 mt-16'>
                        <GenerateSolidColors colors={collection?.colorResponseList}/>
                    </div>
                    <img src='/images/leef1.png' className='absolute left-[-32px] top-[-40px] z-10' alt=''/>
                    <img src='/images/leef2.png'
                         className='absolute right-[-94px] xl:right-[-40px] bottom-0 z-10 hidden xl:block'
                         alt=''/>
                </div>
                <div className='md:w-5/12 h-full overflow-hidden relative'>
                    <ImageGridComponent documentList={collection.documentResponseList}/>
                    <div className='favourite'>
                        <span className='mt-2'>
                            {collection.isFavorite && <IconFavourite/>}
                            {!collection.isFavorite && <Favourite/>}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstSharedCollection
